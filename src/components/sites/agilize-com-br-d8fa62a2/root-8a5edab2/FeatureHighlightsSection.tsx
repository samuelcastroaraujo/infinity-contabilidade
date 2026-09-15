import { Laptop, UserCheck, Eye, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Laptop,
    title: "Praticidade",
    description: "Resolva tudo 100% online, de onde você estiver.",
  },
  {
    icon: UserCheck,
    title: "Especialista contábil",
    description: "Tenha um especialista para cuidar da sua empresa.",
  },
  {
    icon: Eye,
    title: "Transparência",
    description: "Acompanhe em tempo real toda a gestão contábil da sua empresa.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    description: "Você pode confiar: nosso CRC está habilitado em todas as regiões que atendemos.",
  },
];

const STATS = [
  { value: "+13", label: "anos de experiência de mercado" },
  { value: "+20 mil", label: "empreendedores atendidos" },
  { value: "+20 mil", label: "empresas abertas" },
];

export function FeatureHighlightsSection() {
  return (
    <section className="bg-muted py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Tudo o que sua empresa precisa para crescer!
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Tenha <strong className="text-foreground">especialistas dedicados ao seu negócio</strong>,
          que cuidam diariamente de toda a contabilidade da sua empresa.
        </p>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[380px_1fr]">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-secondary">
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background px-4 py-3 shadow-md">
              <p className="text-sm font-bold text-foreground">Cliente Infinity</p>
              <p className="text-xs text-muted-foreground">Sócios, cliente desde 2023</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl bg-background p-6 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-background p-8 shadow-sm sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-4xl font-extrabold text-primary">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button size="lg" className="h-12 rounded-full bg-accent px-8 text-base font-bold text-accent-foreground hover:bg-accent/90">
            Contrate a Infinity
          </Button>
        </div>
      </div>
    </section>
  );
}
