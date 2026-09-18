import { Check, Globe, MessageCircle, MousePointer2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

function WhatsAppMockup() {
  return (
    <div className="relative mx-auto h-56 w-32 overflow-hidden rounded-[1.5rem] border-4 border-neutral-800/10 bg-background shadow-inner">
      <div className="absolute left-1/2 top-1.5 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-neutral-800/10" />
      <div className="flex h-8 items-center justify-center gap-1.5 rounded-t-[1.1rem] bg-primary-600 px-2.5 pt-1">
        <span className="size-4 shrink-0 rounded-full bg-white/30" />
        <span className="truncate text-center text-[7px] font-bold leading-none text-white">
          Infinity Contabilidade
        </span>
      </div>
      <div className="relative h-[calc(100%-2rem)] space-y-1.5 p-2">
        <div className="animate-channel-bubble-out ml-auto w-4/5 rounded-lg rounded-tr-sm bg-neutral-100 px-2 py-1 opacity-0">
          <div className="h-1 w-full rounded-full bg-neutral-400" />
          <div className="mt-1 h-1 w-2/3 rounded-full bg-neutral-400" />
        </div>

        <div className="animate-channel-typing-dots flex w-10 items-center gap-0.5 rounded-lg rounded-tl-sm bg-success/15 px-2 py-1.5 opacity-0">
          <span className="size-1 animate-bounce rounded-full bg-success/60 [animation-delay:-0.3s]" />
          <span className="size-1 animate-bounce rounded-full bg-success/60 [animation-delay:-0.15s]" />
          <span className="size-1 animate-bounce rounded-full bg-success/60" />
        </div>

        <div className="animate-channel-bubble-reply absolute left-2 top-[2.35rem] w-4/5 rounded-lg rounded-tl-sm bg-success/15 px-2 py-1 opacity-0">
          <div className="h-1 w-full rounded-full bg-success/50" />
          <div className="mt-1 h-1 w-1/2 rounded-full bg-success/50" />
        </div>
      </div>
    </div>
  );
}

function DocumentMockup() {
  return (
    <div className="mx-auto flex h-56 w-40 flex-col items-center justify-center rounded-lg border border-border bg-background p-3 shadow-inner">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="animate-channel-btn-press flex items-center gap-1.5 rounded-md bg-primary-500 px-4 py-2 text-[10px] font-bold text-white"
      >
        Enviar documento
      </button>

      <div className="animate-channel-success-in mt-4 flex flex-col items-center opacity-0">
        <span className="flex size-9 items-center justify-center rounded-full bg-success/15">
          <Check className="size-5 text-success" strokeWidth={2.5} />
        </span>
        <p className="mt-2 text-center text-[10px] font-semibold text-neutral-600">
          Documento enviado
        </p>
      </div>
    </div>
  );
}

function SiteMockup() {
  return (
    <div className="relative mx-auto h-56 w-full max-w-[220px] overflow-hidden rounded-lg border border-border bg-background p-3 shadow-inner">
      <div className="flex items-center gap-1">
        <span className="size-2 rounded-full bg-error/50" />
        <span className="size-2 rounded-full bg-warning/60" />
        <span className="size-2 rounded-full bg-success/60" />
        <span className="ml-2 flex-1 truncate rounded-full bg-muted px-2 py-0.5 text-center text-[7px] text-muted-foreground">
          infinitycontabilidade.net
        </span>
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-3 w-2/3 rounded-full bg-neutral-800/15" />
        <div className="animate-channel-section-pulse-1 h-9 w-full rounded-md bg-secondary" />
        <div className="animate-channel-section-pulse-2 h-9 w-full rounded-md bg-secondary" />
        <div className="h-9 w-full rounded-md bg-secondary" />
      </div>

      <span className="animate-channel-cursor-move absolute z-10 -translate-x-1/2 -translate-y-1/2 text-neutral-700">
        <MousePointer2 className="size-3.5 fill-current" />
      </span>
    </div>
  );
}

const ACCENT_STYLES = {
  success: {
    iconWrap: "bg-success/10 text-success",
    hoverBorder: "hover:border-success/40",
  },
  primary: {
    iconWrap: "bg-primary-50 text-primary-600",
    hoverBorder: "hover:border-primary-300",
  },
  silver: {
    iconWrap: "bg-silver-light text-neutral-700",
    hoverBorder: "hover:border-silver-dark",
  },
} as const;

const CHANNELS = [
  {
    name: "WhatsApp",
    Icon: MessageCircle,
    accent: "success",
    headline: "Atendimento próximo e ágil. Resolva rápido tudo o que precisar.",
    Mockup: WhatsAppMockup,
  },
  {
    name: "Aplicativo",
    Icon: Smartphone,
    accent: "primary",
    headline: "Gestão de documentos na palma da mão, a qualquer hora do dia.",
    Mockup: DocumentMockup,
  },
  {
    name: "Site",
    Icon: Globe,
    accent: "silver",
    headline: "Conheça nossos serviços e fale com um especialista pelo site.",
    Mockup: SiteMockup,
  },
] satisfies {
  name: string;
  Icon: typeof MessageCircle;
  accent: keyof typeof ACCENT_STYLES;
  headline: string;
  Mockup: typeof WhatsAppMockup;
}[];

export function ChannelsSection() {
  return (
    <Section tone="subtle">
      <Container>
        <h2 className="text-center font-heading text-h2 font-extrabold text-primary-700">
          Sua rotina simplificada em múltiplos canais.
        </h2>

        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory sm:pb-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {CHANNELS.map((channel) => {
            const style = ACCENT_STYLES[channel.accent];
            return (
              <div
                key={channel.name}
                className={cn(
                  "flex w-[82vw] shrink-0 snap-center flex-col rounded-lg border border-border bg-card p-7 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-md sm:w-auto sm:shrink md:w-auto",
                  style.hoverBorder
                )}
              >
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full",
                    style.iconWrap
                  )}
                >
                  <channel.Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-heading text-h4 font-bold text-foreground">
                  {channel.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-500">{channel.headline}</p>

                <div className="mt-6 flex flex-1 items-end justify-center">
                  <channel.Mockup />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href="#contato">Abrir CNPJ</a>}
          />
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href="#contato">Trazer CNPJ para a Infinity</a>}
          />
        </div>
      </Container>
    </Section>
  );
}
