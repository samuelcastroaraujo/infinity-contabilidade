import Image from "next/image";
import { Check, ShieldCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { InfinityMark } from "../shared/InfinityMark";

const VALUE_PROPS = [
  "Atuação com excelência e confiança desde 2014",
  "Serviços contábeis, fiscais e financeiros sob medida para empresas de todos os portes",
  "Suporte próximo, inteligência, agilidade e segurança para simplificar sua rotina empresarial",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary-700">
      <InfinityMark className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-white/[0.06] lg:-right-10 lg:top-1/2 lg:h-[520px] lg:w-[520px] lg:-translate-y-1/2" />

      <Container className="relative grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div className="relative z-10 text-white">
          <h1 className="whitespace-nowrap font-heading text-[clamp(1.6rem,7.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-white lg:text-[2.625rem]">
            Infinity Contabilidade
          </h1>
          <p className="mt-5 max-w-lg text-body-lg font-semibold text-white">
            Uma infinidade de soluções contábeis.
          </p>
          <p className="mt-3 max-w-lg text-white/80">
            Deixe a burocracia com a gente. Resolvemos tudo, desde a abertura
            do CNPJ até o dia a dia da sua contabilidade.
          </p>

          <ul className="mt-7 space-y-3">
            {VALUE_PROPS.map((text) => (
              <li key={text} className="flex items-start gap-2.5 text-[15px] text-white/90">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Check className="size-3.5 text-white" strokeWidth={3} />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              variant="inverted"
              nativeButton={false}
              render={<a href="#contato">Fale com um especialista</a>}
            />
            <Button
              size="lg"
              variant="outline-inverted"
              nativeButton={false}
              render={<a href="#servicos">Conheça nossos serviços</a>}
            />
          </div>
        </div>

        <div className="group relative hidden aspect-[4/3] items-center justify-center lg:flex">
          <div className="absolute -inset-4 rounded-[3.5rem] bg-white/10 transition-transform duration-500 group-hover:-rotate-2" />
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary-300/25 blur-2xl" />
          <div className="absolute -bottom-8 -left-6 size-32 rounded-full bg-silver/25 blur-2xl" />

          <div className="relative size-full overflow-hidden rounded-[3rem] shadow-2xl ring-1 ring-white/10">
            <Image
              src="/sites/agilize-com-br-d8fa62a2/shared/profissional-contador.jpg"
              alt="Profissional contábil da Infinity Contabilidade"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent" />
          </div>

          <div className="absolute -left-6 top-8 flex items-center gap-3 rounded-lg bg-background px-4 py-3 shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
              <ShieldCheck className="size-4" />
            </span>
            <div className="text-sm">
              <p className="font-bold text-foreground">Desde 2014</p>
              <p className="text-xs text-neutral-500">Anápolis / GO</p>
            </div>
          </div>

          <a
            href="https://wa.me/5562991053454"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -bottom-6 right-6 flex items-center gap-3 rounded-lg bg-background px-4 py-3 shadow-lg transition-transform duration-300 hover:scale-105 group-hover:translate-y-1"
          >
            <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-success text-white">
              <MessageCircle className="size-4" />
              <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-success" />
              </span>
            </span>
            <div className="text-sm">
              <p className="font-bold text-foreground">Fale agora</p>
              <p className="text-xs text-neutral-500">via WhatsApp</p>
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}
