import { Users, FileBarChart, Scale, ReceiptText } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

const SERVICES = [
  {
    icon: Users,
    title: "Folha de Pagamento e Departamento Pessoal",
    description:
      "Fechamento mensal de folha, admissões, demissões e gestão de obrigações acessórias com precisão.",
  },
  {
    icon: FileBarChart,
    title: "Assessoria Contábil e Fiscal",
    description:
      "Classificação, escrituração, análise contábil, emissão de relatórios e orientação estratégica para o seu negócio.",
  },
  {
    icon: Scale,
    title: "Serviços Trabalhistas e Financeiros",
    description:
      "Suporte completo em obrigações trabalhistas e auxílio no planejamento financeiro da sua empresa.",
  },
  {
    icon: ReceiptText,
    title: "Emissão de Nota Fiscal Eletrônica (NFe)",
    description:
      "Implantação de emissores de notas fiscais e suporte contínuo para o dia a dia da sua empresa.",
  },
];

export function ServicesSection() {
  return (
    <Section id="servicos" tone="default" className="scroll-mt-24">
      <Container>
        <h2 className="text-center font-heading text-h2 font-extrabold text-primary-700">
          Serviços
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-500">
          Atuamos nas áreas contábil, fiscal, trabalhista e financeira, com
          soluções sob medida para empresas de todos os portes.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <Card key={service.title} hover>
              <span className="flex size-12 items-center justify-center rounded-full bg-primary-500 text-white">
                <service.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-heading text-h4 font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-500">{service.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
