import { Check } from "lucide-react";
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

        <div className="relative hidden aspect-[4/3] items-center justify-center lg:flex">
          <div className="absolute inset-0 rounded-[3rem] bg-primary-foreground/10" />
          <div className="relative flex size-full items-center justify-center overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary-foreground/15 to-transparent">
            <span className="text-primary-foreground/50">
              [ foto do escritório / equipe ]
            </span>
          </div>
          <div className="absolute -bottom-4 right-4 flex items-center gap-3 rounded-2xl bg-background px-4 py-3 shadow-lg">
            <div className="size-10 shrink-0 rounded-full bg-muted" />
            <div className="text-sm">
              <p className="font-bold text-foreground">Fábio</p>
              <p className="text-xs text-muted-foreground">
                Contador responsável
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
