# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Installer les dépendances nécessaires
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Installer pnpm manuellement pour éviter l'erreur "pnpm: not found"
RUN npm install -g pnpm

# Copier les fichiers de dépendances et installer les paquets
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild du code source si nécessaire
FROM base AS builder
WORKDIR /app

# Installer pnpm dans la phase builder également
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Désactiver la télémétrie Next.js si nécessaire
# ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_QUIZ_API_URL=http://localhost:5151
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAK5MZ58Z1mNdmg0rNvMjxxNmY7YKbnh-A

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Image finale pour exécution en production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Désactiver la télémétrie Next.js si nécessaire
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Assurer les bonnes permissions pour le cache de rendu
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copier les fichiers de build optimisés
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]