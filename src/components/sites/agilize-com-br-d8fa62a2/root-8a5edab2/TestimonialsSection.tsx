"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  { name: "Djalma Vieira", role: "Empresário", quote: "Fiquei satisfeito com o atendimento, sempre ágil no entendimento das solicitações e no envio das documentações necessárias." },
  { name: "Fátima Reis", role: "Empreendedora", quote: "O que mais me surpreende é o quanto tudo é simples e prático. A plataforma funciona de forma intuitiva e o suporte é sempre ágil." },
  { name: "Eduardo Toschi", role: "Empreendedor", quote: "Tenho o serviço exato, o atendimento que preciso, uma solução rápida para minhas questões." },
  { name: "Matheus Menezes", role: "Médico", quote: "Atendimento fácil, tenho tudo na mão, tranquilo de usar e com bom suporte na parte financeira." },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const perPage = 3;
  const maxIndex = Math.max(0, TESTIMONIALS.length - perPage);

  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Depoimentos que reforçam o nosso compromisso!
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Faça como os empreendedores que confiam na Infinity e descobriram
          um novo jeito de lidar com a contabilidade.
        </p>

        <div className="mx-auto mt-6 flex w-fit items-center gap-3 rounded-full border border-border px-4 py-2">
          <span className="font-bold text-foreground">4.7</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-brand-amber text-brand-amber" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">+2.100 avaliações</span>
        </div>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-300"
            style={{ transform: `translateX(-${index * (100 / perPage)}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="w-full shrink-0 rounded-2xl border border-border p-6 sm:w-[calc((100%-3rem)/3)]"
              >
                <p className="text-sm text-foreground/85">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-10 shrink-0 rounded-full bg-muted" />
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            aria-label="Depoimento anterior"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={cn(
              "flex size-9 items-center justify-center rounded-full border border-border",
              index === 0 ? "opacity-40" : "hover:bg-muted"
            )}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label="Próximo depoimento"
            disabled={index === maxIndex}
            onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
            className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
