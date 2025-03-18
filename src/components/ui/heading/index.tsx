"use client"
import clsx from "clsx";
import { EHeading } from "@/enums";

type FormattedTextProps = {
  as?: EHeading;
  children: React.ReactNode;
  className?: string;
};

export default function Heading({ as = EHeading.HEADING_1, children, className = "" }: FormattedTextProps) {

  const styles: Record<EHeading, string> = {
    [EHeading.HEADING_1]: "text-4xl md:text-6xl font-extrabold text-secondary-900 tracking-tight leading-none mb-6",
    [EHeading.HEADING_2]: "text-3xl md:text-5xl font-bold text-secondary-800 tracking-tight leading-tight mb-5 border-b-2 border-primary-400 pb-2 inline-block",
    [EHeading.HEADING_3]: "text-2xl md:text-4xl font-semibold text-secondary-700 tracking-normal leading-snug mb-4 px-3 py-1 rounded-sm",
    [EHeading.HEADING_4]: "text-xl md:text-3xl font-medium text-primary-700 tracking-normal leading-snug mb-3 border-b border-secondary-200",
    [EHeading.HEADING_5]: "text-lg md:text-2xl font-medium text-secondary-800 tracking-normal leading-relaxed mb-2 text-shadow shadow-primary-200",
    [EHeading.HEADING_6]: "text-base md:text-xl font-medium text-secondary-500 tracking-wide leading-relaxed mb-2 uppercase letter-spacing-wider",
  };

  const Tag = as; // Utilisation dynamique de l'élément HTML

  return <Tag className={clsx(styles[as], className)}>{children}</Tag>;
}
