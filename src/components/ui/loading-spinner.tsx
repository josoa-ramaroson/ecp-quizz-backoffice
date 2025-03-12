import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: number
  className?: string
}

export function LoadingSpinner({ size = 24, className }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center py-8">
      <Loader2 className={`animate-spin h-${size} w-${size} ${className} text-primary-600`} />
    </div>
  )
}
