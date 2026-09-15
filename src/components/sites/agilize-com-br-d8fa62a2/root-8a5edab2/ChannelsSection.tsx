import { MessageCircle, Smartphone, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHANNELS = [
  {
    icon: MessageCircle,
    name: "WhatsApp",
    headline: "Atendimento próximo e ágil. Resolva rápido tudo o que precisar.",
    caption: "Atendimento da Infinity Contabilidade pelo WhatsApp",
  },
  {
    icon: Smartphone,
    name: "App",
    headline: "Suas notas fiscais emitidas em segundos, a qualquer hora do dia.",
    caption: "Aplicativo da Infinity Contabilidade para emissão de notas",
  },
  {
    icon: LayoutDashboard,
    name: "Plataforma",
    headline: "Veja tudo o que está sendo feito e o valor dos impostos em tempo real.",
    caption: "Plataforma online da Infinity Contabilidade",
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
              <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <channel.icon className="size-6" />
              </span>
              <p className="mt-5 font-heading text-lg font-bold text-foreground">
                {channel.name}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {channel.headline}
              </p>
              <p className="mt-4 text-xs text-muted-foreground/70">
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
