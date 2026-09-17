"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Menu, X, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { CalculatorsMenu, CALCULATORS } from "./CalculatorsMenu";

const NAV_LINKS_BEFORE = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/#servicos" },
];

const NAV_LINKS_AFTER = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

const CLIENT_AREA_URL =
  "https://passport.nibo.com.br/account/login?id=883acbbd-8468-40ea-a9b0-7e130d91d4e9";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[84px] w-full max-w-[1200px] items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label="Infinity Contabilidade" onClick={() => setMobileOpen(false)}>
          <Logo variant="header" tone="mono" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS_BEFORE.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          {NAV_LINKS_AFTER.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <CalculatorsMenu />
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden sm:flex"
            nativeButton={false}
            render={
              <a href={CLIENT_AREA_URL} target="_blank" rel="noopener noreferrer">
                <LogIn className="size-4" />
                Área do Cliente
              </a>
            }
          />

          <button
            type="button"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-200 lg:hidden"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--silver-light) 0%, var(--silver-dark) 50%, var(--silver-light) 100%)",
        }}
      />

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {[...NAV_LINKS_BEFORE, ...NAV_LINKS_AFTER].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
              >
                {link.label}
              </a>
            ))}

            <p className="mt-2 px-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Calculadoras
            </p>
            {CALCULATORS.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
              >
                <Calculator className="size-4 text-primary" />
                {calc.label}
              </Link>
            ))}

            <a
              href={CLIENT_AREA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-primary px-4 py-3 text-base font-semibold text-primary sm:hidden"
            >
              <LogIn className="size-4" />
              Área do Cliente
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
