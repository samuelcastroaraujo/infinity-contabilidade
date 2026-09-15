import Image from "next/image";
import { Brain, Code2, Megaphone, Globe, ShoppingCart } from "lucide-react";

const SEGMENTS = [
  {
    icon: Brain,
    title: "Saúde",
    description:
      "Médicos, psicólogos, fisioterapeutas, dentistas, nutricionistas e profissionais da área.",
  },
  {
    icon: Code2,
    title: "Tecnologia",
    description:
      "Desenvolvedores, Product Managers, UX UI Designers e profissionais da área.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description:
      "Produtoras audiovisuais, agências de publicidade, publicitários, profissionais de comunicação e marketing.",
  },
  {
    icon: Globe,
    title: "PJ e autônomos",
    description:
      "Engenheiros, arquitetos, consultores de negócio, corretores de imóveis, corretores de seguro, advogados, etc.",
  },
];

export function SegmentsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Contabilidade para cada setor do jeito certo
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Independente da sua área de atuação, a Infinity tem especialistas
          contábeis para o seu negócio crescer sem complicação.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_320px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {SEGMENTS.map((s) => (
              <div key={s.title} className="rounded-2xl bg-secondary p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
            <div className="flex items-center gap-4 rounded-2xl bg-secondary p-6 sm:col-span-2">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ShoppingCart className="size-5" />
              </span>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Empresas de prestação de serviço e comércio em geral
              </h3>
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-2xl lg:block">
            <Image
              src="/sites/agilize-com-br-d8fa62a2/shared/fabio-contador.jpg"
              alt="Fábio Luiz, contador responsável pela Infinity Contabilidade"
              fill
              sizes="320px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
