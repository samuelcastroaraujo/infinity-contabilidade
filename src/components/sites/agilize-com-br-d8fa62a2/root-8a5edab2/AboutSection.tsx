import Image from "next/image";
import { Handshake, Gauge, Eye, MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const DIFERENCIAIS = [
  { icon: Handshake, text: "Atendimento personalizado" },
  { icon: Gauge, text: "Suporte ágil e consultivo" },
  { icon: Eye, text: "Transparência e foco total no cliente" },
  {
    icon: MapPin,
    text: "Atendimento presencial em Anápolis/GO e 100% digital em todo o território nacional",
  },
];

export function AboutSection() {
  return (
    <Section id="sobre" tone="subtle" className="scroll-mt-24">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-h2 font-extrabold text-primary-700">
              Sobre nós
            </h2>
            <p className="mt-5 text-neutral-600">
              A Infinity Contabilidade é uma empresa voltada para a
              transparência, responsabilidade e inovação na gestão contábil.
              Nosso foco é transformar a contabilidade em uma aliada
              estratégica de planejamento e crescimento para o seu negócio.
            </p>

            <div className="mt-8 flex items-center gap-4 rounded-lg bg-background p-5 shadow-sm">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-primary-500">
                <Image
                  src="/sites/agilize-com-br-d8fa62a2/shared/fabio-contador.jpg"
                  alt="Fábio, contador responsável"
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="font-heading text-base font-bold text-foreground">
                  Fábio Luiz
                  <span className="ml-2 text-sm font-medium text-neutral-500">
                    CRC/GO 17334
                  </span>
                </p>
                <p className="text-sm text-neutral-500">
                  Contador responsável com mais de 20 anos de experiência —
                  inteligência contábil aplicada à gestão de negócios.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-neutral-500">
              Desde 2014 atendendo empresas em Anápolis/GO, de forma
              presencial, e em todo o território nacional, de 100% digital.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {DIFERENCIAIS.map((d) => (
              <div key={d.text} className="rounded-lg bg-background p-6 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary-500 text-white">
                  <d.icon className="size-5" />
                </span>
                <p className="mt-4 text-sm font-semibold text-foreground">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
