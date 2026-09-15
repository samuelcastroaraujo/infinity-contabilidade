import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECKLIST = [
  { text: "Sua empresa regularizada e ", bold: "sem multas indesejadas", rest: "" },
  { text: "", bold: "Economia", rest: " no pagamento de impostos" },
  { text: "Suporte com ", bold: "contadores especialistas", rest: "" },
  { text: "Atendimento ", bold: "100% online e humanizado", rest: "" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">
        <div className="relative z-10 text-primary-foreground">
          <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            Você cuida da sua empresa.
            <br />A gente cuida da sua contabilidade.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-primary-foreground/90">
            Deixe a burocracia com a gente. Resolvemos tudo, desde a abertura
            do CNPJ até o dia a dia da sua contabilidade.
          </p>

          <ul className="mt-7 space-y-3">
            {CHECKLIST.map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-[15px]">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Check className="size-3.5 text-accent-foreground" strokeWidth={3} />
                </span>
                {item.text}
                <strong className="font-bold">{item.bold}</strong>
                {item.rest}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="h-12 rounded-full bg-accent px-6 text-base font-bold text-accent-foreground hover:bg-accent/90"
            >
              Abra sua empresa grátis*
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-primary-foreground/40 bg-transparent px-6 text-base font-bold text-primary-foreground hover:bg-primary-foreground/10"
            >
              Troque de contador
            </Button>
          </div>
          <p className="mt-3 text-xs italic text-primary-foreground/70">
            * Consulte condições e cidades disponíveis.
          </p>
        </div>

        <div className="relative hidden aspect-[4/3] items-center justify-center lg:flex">
          <div className="absolute inset-0 rounded-[3rem] bg-primary-foreground/10" />
          <div className="relative flex size-full items-center justify-center overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary-foreground/15 to-transparent">
            <span className="text-primary-foreground/50">
              [ foto de cliente / equipe ]
            </span>
          </div>
          <div className="absolute -bottom-4 right-4 flex items-center gap-3 rounded-2xl bg-background px-4 py-3 shadow-lg">
            <div className="size-10 shrink-0 rounded-full bg-muted" />
            <div className="text-sm">
              <p className="font-bold text-foreground">Fátima Reis</p>
              <p className="text-xs text-muted-foreground">
                Empreendedores do Brasil
              </p>
              <p className="text-xs text-muted-foreground">
                Cliente desde 2018
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
