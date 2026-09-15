import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/sites/agilize-com-br-d8fa62a2/shared/logo-infinity.png"
      alt="Infinity Contabilidade"
      width={607}
      height={411}
      priority
      className={cn("h-16 w-auto object-contain", className)}
    />
  );
}
