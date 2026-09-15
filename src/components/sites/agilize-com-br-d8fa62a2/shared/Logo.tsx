import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 22.4A8.4 8.4 0 1 1 24.4 16 8.41 8.41 0 0 1 16 24.4Z"
          fill="currentColor"
        />
        <circle cx="16" cy="16" r="4.4" fill="currentColor" />
      </svg>
      <span className="font-heading text-xl font-extrabold leading-none text-primary">
        Infinity
        <span className="block text-[0.55rem] font-semibold tracking-[0.2em] text-muted-foreground">
          CONTABILIDADE
        </span>
      </span>
    </div>
  );
}
