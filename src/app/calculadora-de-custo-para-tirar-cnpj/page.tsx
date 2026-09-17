import type { Metadata } from "next";
import { Header } from "@/components/sites/agilize-com-br-d8fa62a2/shared/Header";
import { Footer } from "@/components/sites/agilize-com-br-d8fa62a2/shared/Footer";
import { CustoCnpjCalculator } from "./CustoCnpjCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Custo para Abrir CNPJ | Infinity Contabilidade",
  description:
    "Estime o custo para abrir sua empresa: certificado digital, taxas de registro e alvará. Valores variam por cidade e atividade.",
  alternates: { canonical: "/calculadora-de-custo-para-tirar-cnpj" },
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-10">
          <h1 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
            Calculadora de Custo para Abrir CNPJ
          </h1>
          <p className="mt-4 text-muted-foreground">
            Os custos para abrir uma empresa variam de acordo com a cidade e
            o tipo de negócio — em geral, incluem taxas da Junta Comercial,
            emissão do certificado digital e alvarás da prefeitura. Preencha
            as informações abaixo para uma estimativa.
          </p>

          <CustoCnpjCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}
