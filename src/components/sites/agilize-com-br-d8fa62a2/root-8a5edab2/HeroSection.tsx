import Image from "next/image";
import { Check, ShieldCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const VALUE_PROPS = [
  "Atuação com excelência e confiança desde 2014",
  "Serviços contábeis, fiscais e financeiros sob medida para empresas de todos os portes",
  "Suporte próximo, inteligência, agilidade e segurança para simplificar sua rotina empresarial",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">
        <div className="relative z-10 text-primary-foreground">
          <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            Bem-Vindo à
            <br />
            <span className="uppercase">Infinity Contabilidade</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg font-semibold text-primary-foreground">
            Uma infinidade de soluções contábeis.
          </p>
          <p className="mt-3 max-w-lg text-primary-foreground/90">
            Deixe a burocracia com a gente. Resolvemos tudo, desde a abertura
            do CNPJ até o dia a dia da sua contabilidade.
          </p>

          <ul className="mt-7 space-y-3">
            {VALUE_PROPS.map((text) => (
              <li key={text} className="flex items-start gap-2.5 text-[15px]">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Check className="size-3.5 text-accent-foreground" strokeWidth={3} />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="h-12 rounded-full bg-accent px-6 text-base font-bold text-accent-foreground hover:bg-accent/90"
              nativeButton={false}
              render={<a href="#contato">Fale com um especialista</a>}
            />
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-primary-foreground/40 bg-transparent px-6 text-base font-bold text-primary-foreground hover:bg-primary-foreground/10"
              nativeButton={false}
              render={<a href="#servicos">Conheça nossos serviços</a>}
            />
          </div>
        </div>

        <div className="group relative hidden aspect-[4/3] items-center justify-center lg:flex">
          <div className="absolute -inset-4 rounded-[3.5rem] bg-primary-foreground/10 transition-transform duration-500 group-hover:-rotate-2" />
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-accent/20 blur-2xl" />
          <div className="absolute -bottom-8 -left-6 size-32 rounded-full bg-brand-amber/20 blur-2xl" />

          <div className="relative size-full overflow-hidden rounded-[3rem] shadow-2xl ring-1 ring-primary-foreground/10">
            <Image
              src="/sites/agilize-com-br-d8fa62a2/shared/profissional-contador.jpg"
              alt="Profissional contábil da Infinity Contabilidade"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
          </div>

          <div className="absolute -left-6 top-8 flex items-center gap-3 rounded-2xl bg-background px-4 py-3 shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ShieldCheck className="size-4" />
            </span>
            <div className="text-sm">
              <p className="font-bold text-foreground">Desde 2014</p>
              <p className="text-xs text-muted-foreground">Anápolis / GO</p>
            </div>
          </div>

          <a
            href="https://wa.me/5562991053454"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -bottom-6 right-6 flex items-center gap-3 rounded-2xl bg-background px-4 py-3 shadow-lg transition-transform duration-300 hover:scale-105 group-hover:translate-y-1"
          >
            <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <MessageCircle className="size-4" />
              <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
              </span>
            </span>
            <div className="text-sm">
              <p className="font-bold text-foreground">Fale agora</p>
              <p className="text-xs text-muted-foreground">via WhatsApp</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
