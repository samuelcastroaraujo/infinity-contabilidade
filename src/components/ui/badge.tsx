import { cn } from "@/lib/utils";

const BADGE_VARIANTS = {
  primary: "bg-primary-50 text-primary-700",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  neutral: "bg-neutral-100 text-neutral-700",
} as const;

export function Badge({
  variant = "primary",
  className,
  children,
}: {
  variant?: keyof typeof BADGE_VARIANTS;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        BADGE_VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
