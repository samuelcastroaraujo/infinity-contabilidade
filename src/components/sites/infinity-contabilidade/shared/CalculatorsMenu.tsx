"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

export const CALCULATORS = [
  {
    label: "Custo para abrir CNPJ",
    description: "Estime o custo de abertura da sua empresa",
    href: "/calculadora-de-custo-para-tirar-cnpj",
  },
  {
    label: "CLT vs PJ",
    description: "Compare seu salário como CLT e como PJ",
    href: "/calculadora-clt-pj",
  },
  {
    label: "Reforma Tributária",
    description: "Simule o impacto da reforma no seu negócio",
    href: "/calculadora-reforma-tributaria",
  },
];

export function CalculatorsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id="calculators-menu-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="calculators-menu-panel"
        className="flex items-center gap-1 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
      >
        Calculadoras
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>

      <div
        id="calculators-menu-panel"
        role="menu"
        aria-labelledby="calculators-menu-trigger"
        hidden={!open}
        className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-border bg-background p-2 shadow-lg"
      >
        {CALCULATORS.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <Calculator className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">
                {calc.label}
              </span>
              <span className="block text-xs text-muted-foreground">
                {calc.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
