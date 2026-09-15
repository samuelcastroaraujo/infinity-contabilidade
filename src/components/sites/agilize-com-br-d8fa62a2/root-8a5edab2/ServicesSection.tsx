import { Users, FileBarChart, Scale, ReceiptText } from "lucide-react";

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
    <section id="servicos" className="bg-muted py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Serviços
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Atuamos nas áreas contábil, fiscal, trabalhista e financeira, com
          soluções sob medida para empresas de todos os portes.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <div key={service.title} className="rounded-2xl bg-background p-7 shadow-sm">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <service.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
