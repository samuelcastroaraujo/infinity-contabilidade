import { Check, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

function WhatsAppMockup() {
  return (
    <div className="relative mx-auto h-56 w-32 rounded-[1.5rem] border-4 border-foreground/10 bg-background shadow-inner">
      <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-foreground/10" />
      <div className="flex h-7 items-center gap-1.5 rounded-t-[1.1rem] bg-primary px-2.5 pt-1">
        <span className="size-4 rounded-full bg-primary-foreground/30" />
        <span className="h-1.5 w-10 rounded-full bg-primary-foreground/40" />
      </div>
      <div className="space-y-1.5 p-2">
        <div className="ml-auto w-4/5 rounded-lg rounded-tr-sm bg-secondary px-2 py-1">
          <div className="h-1 w-full rounded-full bg-secondary-foreground/25" />
          <div className="mt-1 h-1 w-2/3 rounded-full bg-secondary-foreground/25" />
        </div>
        <div className="w-4/5 rounded-lg rounded-tl-sm bg-accent/20 px-2 py-1">
          <div className="h-1 w-full rounded-full bg-accent-foreground/25" />
        </div>
        <div className="ml-auto w-3/5 rounded-lg rounded-tr-sm bg-secondary px-2 py-1">
          <div className="h-1 w-full rounded-full bg-secondary-foreground/25" />
        </div>
      </div>
    </div>
  );
}

function InvoiceMockup() {
  return (
    <div className="mx-auto h-56 w-40 rounded-2xl border border-border bg-background p-3 shadow-inner">
      <div className="flex items-center gap-1.5">
        <FileText className="size-3.5 text-primary" />
        <div className="h-1.5 w-16 rounded-full bg-foreground/15" />
      </div>
      <div className="mt-4 flex items-center justify-center rounded-full bg-accent/15 py-3">
        <Check className="size-6 text-accent" strokeWidth={2.5} />
      </div>
      <p className="mt-3 text-center text-[10px] font-semibold text-foreground/70">
        NFe emitida
      </p>
      <div className="mt-4 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-muted" />
        <div className="h-1.5 w-4/5 rounded-full bg-muted" />
        <div className="h-1.5 w-3/5 rounded-full bg-muted" />
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="mx-auto h-56 w-full max-w-[220px] rounded-2xl border border-border bg-background p-3 shadow-inner">
      <div className="flex items-center gap-1">
        <span className="size-2 rounded-full bg-destructive/50" />
        <span className="size-2 rounded-full bg-brand-amber/70" />
        <span className="size-2 rounded-full bg-accent/70" />
      </div>
      <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-secondary px-2 py-1.5">
        <TrendingUp className="size-3.5 text-primary" />
        <div className="h-1.5 w-14 rounded-full bg-secondary-foreground/25" />
      </div>
      <div className="mt-3 flex h-20 items-end gap-1.5 px-1">
        {[40, 65, 45, 80, 60, 90].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-primary/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-muted" />
      <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-muted" />
    </div>
  );
}

const CHANNELS = [
  {
    name: "WhatsApp",
    headline: "Atendimento próximo e ágil. Resolva rápido tudo o que precisar.",
    caption: "Atendimento da Infinity Contabilidade pelo WhatsApp",
    Mockup: WhatsAppMockup,
  },
  {
    name: "App",
    headline: "Suas notas fiscais emitidas em segundos, a qualquer hora do dia.",
    caption: "Aplicativo da Infinity Contabilidade para emissão de notas",
    Mockup: InvoiceMockup,
  },
  {
    name: "Plataforma",
    headline: "Veja tudo o que está sendo feito e o valor dos impostos em tempo real.",
    caption: "Plataforma online da Infinity Contabilidade",
    Mockup: DashboardMockup,
  },
];

export function ChannelsSection() {
  return (
    <section className="bg-muted py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Sua rotina simplificada em múltiplos canais.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CHANNELS.map((channel) => (
            <div key={channel.name} className="rounded-2xl bg-background p-7 shadow-sm">
              <p className="font-heading text-lg font-bold text-foreground">
                {channel.name}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {channel.headline}
              </p>

              <div className="mt-6 flex justify-center">
                <channel.Mockup />
              </div>

              <p className="mt-5 text-center text-xs text-muted-foreground/70">
                {channel.caption}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="h-12 rounded-full bg-accent px-6 text-base font-bold text-accent-foreground hover:bg-accent/90"
            nativeButton={false}
            render={<a href="#contato">Abrir CNPJ grátis</a>}
          />
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-primary px-6 text-base font-bold text-primary hover:bg-primary/5"
            nativeButton={false}
            render={<a href="#contato">Trazer CNPJ para a Infinity</a>}
          />
        </div>
      </div>
    </section>
  );
}
