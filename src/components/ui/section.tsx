import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  default: "bg-background",
  subtle: "bg-neutral-50",
  primary: "bg-primary-700 text-white",
} as const;

export function Section({
  as: Tag = "section",
  tone = "default",
  className,
  children,
  ...props
}: {
  as?: React.ElementType;
  tone?: keyof typeof TONE_CLASSES;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={cn("py-16 sm:py-20 lg:py-24", TONE_CLASSES[tone], className)} {...props}>
      {children}
    </Tag>
  );
}
