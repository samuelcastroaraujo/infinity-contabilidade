"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "Basic",
    badge: "Benefícios exclusivos",
    description: "Perfeito para quem precisa de suporte, autonomia e agilidade no dia a dia.",
    oldPrice: "R$ 324,00",
    price: "259,00",
    highlighted: false,
    features: [
      "Abertura de CNPJ (grátis)",
      "Contabilidade completa",
      "Certificado digital A1 incluso",
      "Atendimento por WhatsApp, telefone, e-mail e chat",
      "Painel contábil completo para a sua empresa",
      "Gestão de folha de sócios e funcionários: até 3 pessoas",
    ],
  },
  {
    name: "Unique",
    badge: "Especialista dedicado",
    description: "Tenha um gerente de conta dedicado para sua empresa.",
    oldPrice: "R$ 562,00",
    price: "450,00",
    highlighted: true,
    features: [
      "Tudo do plano Basic, mais:",
      "Gerente de conta dedicado",
      "Horário estendido: atendimento das 8h às 21h",
      "Gestão de folha: até 5 pessoas",
      "Importação e notas fiscais em qualquer município",
      "Declaração de Imposto de Renda para Pessoa Física",
    ],
  },
  {
    name: "Unique Plus",
    badge: "Alta demanda",
    description: "Para quem tem uma operação maior e mais demandas financeiras.",
    oldPrice: "R$ 875,00",
    price: "700,00",
    highlighted: false,
    features: [
      "Tudo do plano Unique, mais:",
      "Até 100 operações de notas fiscais por mês",
      "Importação de até 800 notas fiscais",
      "Importação de extrato bancário: até 3 contas",
    ],
  },
];

export function PricingSection() {
  const [mode, setMode] = useState<"servico" | "comercio">("servico");

  return (
    <section id="planos" className="py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Escolha o plano que melhor se adequa à sua necessidade!
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Planos completos, com suporte humano e tecnologia para simplificar
          sua rotina.
        </p>

        <div className="mx-auto mt-8 flex w-fit rounded-full bg-secondary p-1">
          {(["servico", "comercio"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-bold transition-colors",
                mode === m
                  ? "bg-primary text-primary-foreground"
                  : "text-secondary-foreground"
              )}
            >
              {m === "servico" ? "Serviço" : "Comércio"}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "overflow-hidden rounded-3xl border",
                plan.highlighted
                  ? "border-primary shadow-lg ring-1 ring-primary"
                  : "border-border"
              )}
            >
              <div
                className={cn(
                  "px-6 py-3 text-center text-xs font-bold uppercase tracking-wide",
                  plan.highlighted
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {plan.badge}
              </div>
              <div className="p-6">
                <h3 className="text-center font-heading text-2xl font-extrabold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground line-through">
                    {plan.oldPrice}
                  </p>
                  <p className="font-heading text-3xl font-extrabold text-foreground">
                    R$ {plan.price}
                    <span className="text-base font-medium text-muted-foreground">
                      /mês
                    </span>
                  </p>
                  <span className="mt-1 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                    20% de desconto
                  </span>
                </div>
                <Button className="mt-5 h-11 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Contratar
                </Button>

                <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-foreground/85">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          *Valores válidos para empresas do Simples Nacional. Para Lucro
          Presumido, fale com os especialistas.
        </p>
      </div>
    </section>
  );
}
