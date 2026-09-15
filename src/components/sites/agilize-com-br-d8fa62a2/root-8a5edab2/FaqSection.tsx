"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  { q: "Como funciona o serviço de contabilidade online da Infinity?", a: "Toda a gestão contábil é feita digitalmente, com um time de contadores dedicado, painel online e atendimento por WhatsApp, chat, telefone e e-mail." },
  { q: "A contabilidade online é segura?", a: "Sim. Seguimos as normas do Conselho Regional de Contabilidade e usamos infraestrutura com criptografia de ponta a ponta." },
  { q: "O que está incluso na mensalidade?", a: "Contabilidade completa, emissão de notas fiscais, painel de gestão, suporte humano e acesso a benefícios exclusivos, de acordo com o plano escolhido." },
  { q: "Existem contadores de verdade por trás do serviço?", a: "Sim, nosso time é formado por contadores registrados e especialistas dedicados a cada segmento." },
  { q: "Quais tipos de serviço de contabilidade posso contratar?", a: "Abertura de empresa, troca de contador, migração de MEI para ME e contabilidade recorrente para diferentes segmentos." },
  { q: "Quais empresas podem contratar a Infinity?", a: "Atendemos MEI, microempresas e pequenas empresas do Simples Nacional e Lucro Presumido em todo o Brasil." },
  { q: "Quanto custa a contabilidade da Infinity?", a: "Os planos começam a partir de valores acessíveis, com desconto para contratação anual. Fale com um especialista para uma proposta personalizada." },
  { q: "É preciso contador para abrir uma empresa?", a: "Na maioria dos casos sim, e nós cuidamos de todo o processo de abertura para você." },
  { q: "A abertura de empresa é mesmo grátis?", a: "Sim, a abertura de CNPJ é gratuita para quem contrata um de nossos planos de contabilidade." },
  { q: "Como contratar a Infinity?", a: "Basta preencher o formulário no site ou falar com um de nossos especialistas por WhatsApp." },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="pb-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Perguntas Frequentes
        </h2>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-2xl bg-muted">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="px-6">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-semibold text-foreground">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-muted-foreground transition-transform",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <p className="pb-5 text-sm text-muted-foreground">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
