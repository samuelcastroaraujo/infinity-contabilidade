"use client";

import { useState } from "react";
import { FileText, Repeat, BarChart3, Headphones, FileCheck2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "abrir", label: "Abrir empresa", icon: FileText },
  { id: "trocar", label: "Trocar de contador", icon: Repeat },
  { id: "migrar", label: "Migrar de MEI para ME", icon: BarChart3 },
] as const;

const STEPS_BY_TAB: Record<(typeof TABS)[number]["id"], { icon: typeof Headphones; title: string; description: string }[]> = {
  abrir: [
    {
      icon: Headphones,
      title: "Consultoria especializada",
      description:
        "Nosso time de contadores vai ajudar você a escolher o melhor regime tributário e estrutura para otimizar a contabilidade da sua empresa, com contratação mediante pagamento da primeira mensalidade.",
    },
    {
      icon: FileCheck2,
      title: "Abertura da sua empresa",
      description:
        "Assumimos toda a parte burocrática e iniciamos o processo de abertura da sua empresa, atualizando sobre todas as etapas do processo.",
    },
    {
      icon: CheckCircle2,
      title: "Seu CNPJ está pronto!",
      description:
        "Após a validação com você e a prefeitura da sua cidade, sua empresa está aberta! Agora, nós assumimos a sua contabilidade e você pode focar no que importa: fazer a sua empresa crescer.",
    },
  ],
  trocar: [
    { icon: Headphones, title: "Diagnóstico gratuito", description: "Avaliamos sua situação fiscal atual e identificamos oportunidades de economia." },
    { icon: FileCheck2, title: "Migração assistida", description: "Cuidamos de toda a transição com seu contador anterior, sem burocracia para você." },
    { icon: CheckCircle2, title: "Pronto, é só continuar crescendo!", description: "Sua contabilidade passa a rodar 100% online, com suporte humano sempre que precisar." },
  ],
  migrar: [
    { icon: Headphones, title: "Análise de faturamento", description: "Verificamos o momento certo para migrar do MEI para ME sem perder benefícios." },
    { icon: FileCheck2, title: "Enquadramento tributário", description: "Definimos o regime ideal para reduzir impostos na nova estrutura." },
    { icon: CheckCircle2, title: "Empresa migrada com segurança", description: "Você segue crescendo com uma contabilidade preparada para o próximo passo." },
  ],
};

export function ProcessSection() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("abrir");
  const steps = STEPS_BY_TAB[active];

  return (
    <section className="bg-muted py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Uma contabilidade que te acompanha em cada momento
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Desde a escolha do melhor regime tributário para sua empresa até a
          rotina contábil do dia a dia, vamos cuidar de tudo para que você
          possa empreender com segurança e sem preocupações. Veja como é
          simples abrir sua empresa ou migrar sua contabilidade para a
          Infinity.
        </p>

        <div className="mt-10 rounded-3xl bg-background p-6 sm:p-10">
          <div
            role="tablist"
            aria-label="Etapas do processo"
            className="flex flex-wrap justify-center gap-3"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
                  active === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                )}
              >
                <tab.icon className="size-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 rounded-2xl bg-secondary p-6 sm:p-10 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="size-6" />
                  <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-background text-xs font-bold text-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
