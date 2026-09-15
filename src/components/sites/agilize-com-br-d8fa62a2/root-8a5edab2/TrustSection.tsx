import { CheckCircle2, Star } from "lucide-react";

const CHECKS = [
  { title: "Empresa regida e fiscalizada pelo Conselho Regional de Contabilidade" },
  { title: "Transparência de processos de abertura de empresa" },
  { title: "Atendimento multicanal", subtitle: "WhatsApp, chat, telefone e e-mail" },
];

export function TrustSection() {
  return (
    <section id="sobre" className="bg-muted py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl bg-background p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-primary sm:text-3xl">
              Somos a primeira contabilidade 100% online do Brasil
            </h2>
            <p className="mt-4 text-muted-foreground">
              Pioneira em contabilidade online, a Infinity transformou a forma
              como micro e pequenos empreendedores lidam com suas obrigações
              fiscais.
            </p>
            <p className="mt-4 font-semibold text-foreground">
              Combinamos tecnologia inteligente e suporte humano de
              especialistas em contabilidade para oferecer um serviço ágil,
              transparente e econômico.
            </p>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-secondary" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-background p-8">
            <ul className="space-y-5">
              {CHECKS.map((c) => (
                <li key={c.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">{c.title}</p>
                    {c.subtitle && (
                      <p className="text-sm text-muted-foreground">{c.subtitle}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-background p-8">
            <p className="font-heading text-lg font-bold text-foreground">
              Selo de excelência no Reclame Aqui
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-brand-amber text-brand-amber" />
                ))}
              </div>
              <span className="font-bold text-foreground">4.8</span>
              <span className="text-sm text-muted-foreground">
                no Google My Business
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              +2.000 avaliações • Excelente
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
