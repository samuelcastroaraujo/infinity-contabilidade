"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Qual a melhor contabilidade em Anápolis?",
    a: "A escolha ideal depende do porte e do segmento da sua empresa. A Infinity Contabilidade atua em Anápolis desde 2014, com atendimento presencial na cidade e suporte consultivo em contabilidade, folha de pagamento, obrigações fiscais e trabalhistas — sempre com foco em transparência e proximidade com o cliente.",
  },
  {
    q: "Quanto custa um contador em Anápolis?",
    a: "O valor da mensalidade contábil varia de acordo com o regime tributário, o volume de notas fiscais e o número de funcionários da empresa. Fale com um dos nossos especialistas para receber uma proposta personalizada para o seu negócio.",
  },
  {
    q: "Como abrir uma empresa em Anápolis-GO?",
    a: "O processo envolve definir a natureza jurídica, o regime tributário e registrar o CNPJ junto aos órgãos competentes. A Infinity Contabilidade orienta todo esse processo para empreendedores de Anápolis e região, cuidando da parte contábil e fiscal da abertura.",
  },
  {
    q: "Preciso de contador para abrir um MEI em Anápolis?",
    a: "A abertura do MEI pode ser feita diretamente pelo empreendedor, mas contar com um contador ajuda a evitar erros no enquadramento e a planejar a migração para microempresa quando o faturamento crescer.",
  },
  {
    q: "A Infinity Contabilidade atende empresas de outras cidades e estados?",
    a: "Sim. Temos atendimento presencial em Anápolis/GO e atendimento 100% digital para empresas em todo o território nacional.",
  },
  {
    q: "A contabilidade digital substitui o atendimento presencial?",
    a: "Para a maior parte das rotinas contábeis e fiscais, sim — tudo pode ser resolvido online, com agilidade e segurança. Em Anápolis, também oferecemos atendimento presencial para quem preferir esse contato direto.",
  },
  {
    q: "Quais serviços a Infinity Contabilidade oferece?",
    a: "Folha de pagamento e departamento pessoal, assessoria contábil e fiscal, serviços trabalhistas e financeiros, e emissão de nota fiscal eletrônica (NFe), entre outras rotinas contábeis para empresas de todos os portes.",
  },
  {
    q: "Como falar com um especialista da Infinity Contabilidade?",
    a: "Você pode entrar em contato pelo WhatsApp, telefone ou e-mail listados na seção de contato deste site, ou preencher o formulário que fica na parte de baixo da página.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone="default">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <h2 className="text-center font-heading text-h2 font-extrabold text-primary-700">
          Perguntas Frequentes
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-500">
          Dúvidas sobre contabilidade em Anápolis e região? Reunimos as
          perguntas mais comuns dos nossos clientes.
        </p>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border overflow-hidden rounded-lg border border-border bg-background">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className={cn("px-6 transition-colors", isOpen && "bg-primary-50/60")}
              >
                <button
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className={cn("font-semibold", isOpen ? "text-primary-700" : "text-foreground")}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 transition-transform",
                      isOpen ? "rotate-180 text-primary-600" : "text-neutral-400"
                    )}
                  />
                </button>
                <p
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!isOpen}
                  className="pb-5 text-sm text-neutral-600"
                >
                  {faq.a}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
