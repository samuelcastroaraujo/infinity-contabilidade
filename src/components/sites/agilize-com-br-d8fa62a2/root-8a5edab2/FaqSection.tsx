"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
    <section className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Perguntas Frequentes
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Dúvidas sobre contabilidade em Anápolis e região? Reunimos as
          perguntas mais comuns dos nossos clientes.
        </p>

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
