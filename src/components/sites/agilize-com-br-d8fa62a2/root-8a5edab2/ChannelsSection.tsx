import { Check, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function WhatsAppMockup() {
  return (
    <div className="relative mx-auto h-56 w-32 overflow-hidden rounded-[1.5rem] border-4 border-foreground/10 bg-background shadow-inner">
      <div className="absolute left-1/2 top-1.5 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-foreground/10" />
      <div className="flex h-8 items-center gap-1.5 rounded-t-[1.1rem] bg-primary px-2.5 pt-1">
        <span className="size-4 shrink-0 rounded-full bg-primary-foreground/30" />
        <span className="truncate text-[7px] font-bold leading-none text-primary-foreground">
          Infinity Contabilidade
        </span>
      </div>
      <div className="relative h-[calc(100%-2rem)] space-y-1.5 p-2">
        <div className="animate-channel-bubble-out ml-auto w-4/5 rounded-lg rounded-tr-sm bg-secondary px-2 py-1 opacity-0">
          <div className="h-1 w-full rounded-full bg-secondary-foreground/30" />
          <div className="mt-1 h-1 w-2/3 rounded-full bg-secondary-foreground/30" />
        </div>

        <div className="animate-channel-typing-dots flex w-10 items-center gap-0.5 rounded-lg rounded-tl-sm bg-accent/15 px-2 py-1.5 opacity-0">
          <span className="size-1 animate-bounce rounded-full bg-accent-foreground/50 [animation-delay:-0.3s]" />
          <span className="size-1 animate-bounce rounded-full bg-accent-foreground/50 [animation-delay:-0.15s]" />
          <span className="size-1 animate-bounce rounded-full bg-accent-foreground/50" />
        </div>

        <div className="animate-channel-bubble-reply absolute left-2 top-[2.35rem] w-4/5 rounded-lg rounded-tl-sm bg-accent/20 px-2 py-1 opacity-0">
          <div className="h-1 w-full rounded-full bg-accent-foreground/30" />
          <div className="mt-1 h-1 w-1/2 rounded-full bg-accent-foreground/30" />
        </div>
      </div>
    </div>
  );
}

function DocumentMockup() {
  return (
    <div className="mx-auto flex h-56 w-40 flex-col items-center justify-center rounded-2xl border border-border bg-background p-3 shadow-inner">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="animate-channel-btn-press flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[10px] font-bold text-primary-foreground"
      >
        Enviar documento
      </button>

      <div className="animate-channel-success-in mt-4 flex flex-col items-center opacity-0">
        <span className="flex size-9 items-center justify-center rounded-full bg-accent/15">
          <Check className="size-5 text-accent" strokeWidth={2.5} />
        </span>
        <p className="mt-2 text-center text-[10px] font-semibold text-foreground/70">
          Documento enviado
        </p>
      </div>
    </div>
  );
}

function SiteMockup() {
  return (
    <div className="relative mx-auto h-56 w-full max-w-[220px] overflow-hidden rounded-2xl border border-border bg-background p-3 shadow-inner">
      <div className="flex items-center gap-1">
        <span className="size-2 rounded-full bg-destructive/50" />
        <span className="size-2 rounded-full bg-brand-amber/70" />
        <span className="size-2 rounded-full bg-accent/70" />
        <span className="ml-2 flex-1 truncate rounded-full bg-muted px-2 py-0.5 text-[7px] text-muted-foreground">
          infinitycontabilidade.com.br
        </span>
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-3 w-2/3 rounded-full bg-foreground/15" />
        <div className="animate-channel-section-pulse-1 h-9 w-full rounded-lg bg-secondary" />
        <div className="animate-channel-section-pulse-2 h-9 w-full rounded-lg bg-secondary" />
        <div className="h-9 w-full rounded-lg bg-secondary" />
      </div>

      <span className="animate-channel-cursor-move absolute z-10 -translate-x-1/2 -translate-y-1/2 text-foreground/70">
        <MousePointer2 className="size-3.5 fill-current" />
      </span>
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
    headline: "Gestão de documentos na palma da mão, a qualquer hora do dia.",
    caption: "Aplicativo da Infinity Contabilidade para gestão de documentos",
    Mockup: DocumentMockup,
  },
  {
    name: "Site",
    headline: "Conheça nossos serviços e fale com um especialista pelo site.",
    caption: "Site oficial da Infinity Contabilidade",
    Mockup: SiteMockup,
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
