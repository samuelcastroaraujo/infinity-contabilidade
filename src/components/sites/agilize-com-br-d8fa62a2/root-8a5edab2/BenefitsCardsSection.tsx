import { ArrowRight, MessageCircle, HeartPulse, Stethoscope, Calculator } from "lucide-react";

const BENEFITS = [
  { icon: MessageCircle, tag: "WhatsApp", title: "Atendimento por WhatsApp" },
  { icon: HeartPulse, tag: "Bem-estar", title: "Bem-estar no seu dia a dia" },
  { icon: Stethoscope, tag: "Saúde", title: "Saúde de onde estiver" },
  { icon: Calculator, tag: "Fator R", title: "Redução de impostos" },
];

export function BenefitsCardsSection() {
  return (
    <section className="bg-muted py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Benefícios exclusivos para você e sua empresa
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="group flex flex-col overflow-hidden rounded-2xl bg-background shadow-sm"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-secondary text-secondary-foreground/40">
                <b.icon className="size-10" />
              </div>
              <div className="flex flex-1 items-center justify-between gap-2 p-5">
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    {b.title}
                  </h3>
                  <span className="mt-2 inline-block rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                    {b.tag}
                  </span>
                </div>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
