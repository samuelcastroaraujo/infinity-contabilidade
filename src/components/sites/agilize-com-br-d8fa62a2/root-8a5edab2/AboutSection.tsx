import Image from "next/image";
import { Handshake, Gauge, Eye, MapPin } from "lucide-react";

const DIFERENCIAIS = [
  { icon: Handshake, text: "Atendimento personalizado" },
  { icon: Gauge, text: "Suporte ágil e consultivo" },
  { icon: Eye, text: "Transparência e foco total no cliente" },
  { icon: MapPin, text: "Atendimento presencial em Anápolis/GO e 100% digital em todo o território nacional" },
];

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
              Sobre nós
            </h2>
            <p className="mt-5 text-muted-foreground">
              A Infinity Contabilidade é uma empresa voltada para a
              transparência, responsabilidade e inovação na gestão contábil.
              Nosso foco é transformar a contabilidade em uma aliada
              estratégica de planejamento e crescimento para o seu negócio.
            </p>

            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-secondary p-5">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-primary">
                <Image
                  src="/sites/agilize-com-br-d8fa62a2/shared/fabio-contador.jpg"
                  alt="Fábio, contador responsável"
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-foreground">
                  Fábio Luiz
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    CRC/GO 17334
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Contador responsável com mais de 20 anos de experiência —
                  inteligência contábil aplicada à gestão de negócios.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Desde 2014 atendendo empresas em Anápolis/GO, de forma
              presencial, e em todo o território nacional, de 100% digital.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {DIFERENCIAIS.map((d) => (
              <div key={d.text} className="rounded-2xl bg-muted p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <d.icon className="size-5" />
                </span>
                <p className="mt-4 text-sm font-semibold text-foreground">
                  {d.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
