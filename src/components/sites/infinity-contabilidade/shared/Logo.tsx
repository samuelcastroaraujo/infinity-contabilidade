import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SOURCES = {
  default: {
    metallic: "/sites/infinity-contabilidade/shared/logo-infinity.png",
    mono: "/sites/infinity-contabilidade/shared/logo-infinity-mono.png",
  },
  header: {
    metallic: "/sites/infinity-contabilidade/shared/logo-infinity-header.png",
    mono: "/sites/infinity-contabilidade/shared/logo-infinity-header-mono.png",
  },
} as const;

export function Logo({
  className,
  variant = "default",
  tone = "metallic",
}: {
  className?: string;
  variant?: "default" | "header";
  /** "metallic" (prata, para fundos escuros/azuis) ou "mono" (primary-700 sólido, para fundos claros) */
  tone?: "metallic" | "mono";
}) {
  const isHeader = variant === "header";

  return (
    <Image
      src={LOGO_SOURCES[variant][tone]}
      alt="Infinity Contabilidade"
      width={isHeader ? 483 : 607}
      height={isHeader ? 261 : 411}
      // Exibido em h-16 (64px de altura); a largura real renderizada é bem
      // menor que a intrínseca — sem isso o Next.js escolhe variantes de
      // srcset maiores que o necessário (w=1080/1920, ~50KB desperdiçados).
      sizes={isHeader ? "120px" : "96px"}
      priority
      className={cn("h-16 w-auto object-contain", className)}
    />
  );
}
