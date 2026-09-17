"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Repeat, BarChart3, Headphones, FileCheck2, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
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

const NODE_TONE = ["bg-primary-400", "bg-primary-600", "bg-success"];

type Step = { icon: typeof Headphones; title: string; description: string };

function DesktopTrack({ steps, inView }: { steps: Step[]; inView: boolean }) {
  return (
    <div className="mt-10 hidden rounded-lg bg-secondary p-10 md:flex">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={step.title} className="relative flex flex-1 flex-col items-center px-4 text-center">
            {i > 0 && (
              <div aria-hidden className="absolute left-0 right-1/2 top-7 h-0.5 overflow-hidden bg-neutral-200">
                <div
                  className={cn(
                    "h-full origin-left bg-primary-400 transition-transform duration-700 ease-out",
                    inView ? "scale-x-100" : "scale-x-0"
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                />
                {inView && (
                  <div
                    className="animate-track-light-x absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/90 to-transparent"
                    style={{ animationDelay: `${700 + i * 150}ms` }}
                  />
                )}
              </div>
            )}
            <div
              className={cn(
                "relative z-10 flex size-14 items-center justify-center rounded-full font-heading text-lg font-bold text-white shadow-md transition-all duration-500",
                NODE_TONE[i],
                inView ? "scale-100 opacity-100" : "scale-75 opacity-0"
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {i + 1}
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <step.icon className="size-4 text-primary-600" />
              <h3 className="font-heading text-base font-bold text-foreground">{step.title}</h3>
            </div>
            <p className="mt-2 text-sm text-neutral-500">{step.description}</p>
            {isLast && (
              <span className="mt-3 inline-flex items-center rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                Concluído
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MobileTimeline({ steps, inView }: { steps: Step[]; inView: boolean }) {
  return (
    <div className="mt-10 space-y-8 rounded-lg bg-secondary p-6 md:hidden">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={step.title} className="relative flex gap-4">
            {!isLast && (
              <div aria-hidden className="absolute left-7 top-14 h-[calc(100%-0.5rem)] w-0.5 -translate-x-1/2 overflow-hidden bg-neutral-200">
                <div
                  className={cn(
                    "h-full w-full origin-top bg-primary-400 transition-transform duration-700 ease-out",
                    inView ? "scale-y-100" : "scale-y-0"
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                />
                {inView && (
                  <div
                    className="animate-track-light-y absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-white/90 to-transparent"
                    style={{ animationDelay: `${700 + i * 150}ms` }}
                  />
                )}
              </div>
            )}
            <div
              className={cn(
                "z-10 flex size-14 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold text-white shadow-md",
                NODE_TONE[i]
              )}
            >
              {i + 1}
            </div>
            <div className="pt-1.5">
              <div className="flex items-center gap-1.5">
                <step.icon className="size-4 text-primary-600" />
                <h3 className="font-heading text-base font-bold text-foreground">{step.title}</h3>
              </div>
              <p className="mt-1.5 text-sm text-neutral-500">{step.description}</p>
              {isLast && (
                <span className="mt-2 inline-flex items-center rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                  Concluído
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProcessSection() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("abrir");

  const trackRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section tone="subtle">
      <Container>
        <h2 className="text-center font-heading text-h2 font-extrabold text-primary-700">
          Uma contabilidade que te acompanha em cada momento
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-500">
          Desde a escolha do melhor regime tributário para sua empresa até a
          rotina contábil do dia a dia, vamos cuidar de tudo para que você
          possa empreender com segurança e sem preocupações. Veja como é
          simples abrir sua empresa ou migrar sua contabilidade para a
          Infinity.
        </p>

        <div className="mt-10 rounded-lg border border-border bg-background p-6 shadow-sm sm:p-10">
          <div
            role="tablist"
            aria-label="Etapas do processo"
            className="flex flex-wrap justify-center gap-3"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`process-tab-${tab.id}`}
                role="tab"
                aria-selected={active === tab.id}
                aria-controls={`process-panel-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
                  active === tab.id
                    ? "bg-primary-500 text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-primary-100"
                )}
              >
                <tab.icon className="size-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div ref={trackRef}>
            {TABS.map((tab) => (
              <div
                key={tab.id}
                id={`process-panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`process-tab-${tab.id}`}
                hidden={active !== tab.id}
              >
                <DesktopTrack steps={STEPS_BY_TAB[tab.id]} inView={inView} />
                <MobileTimeline steps={STEPS_BY_TAB[tab.id]} inView={inView} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
