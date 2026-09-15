import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Planos", href: "#planos" },
  { label: "Recursos", href: "#recursos" },
  { label: "Sobre nós", href: "#sobre" },
];

const CLIENT_AREA_URL =
  "https://passport.nibo.com.br/account/login?id=883acbbd-8468-40ea-a9b0-7e130d91d4e9";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[84px] w-full items-center border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label="Infinity Contabilidade">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          variant="outline"
          className="rounded-full border-primary px-4 text-primary"
          nativeButton={false}
          render={
            <a href={CLIENT_AREA_URL} target="_blank" rel="noopener noreferrer">
              <LogIn className="size-4" />
              Área do Cliente
            </a>
          }
        />
      </div>
    </header>
  );
}
