import { cn } from "@/lib/utils";

export function Card({
  className,
  hover = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 shadow-sm",
        hover &&
          "transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
