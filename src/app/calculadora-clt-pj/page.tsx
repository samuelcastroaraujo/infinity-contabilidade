import type { Metadata } from "next";
import { Header } from "@/components/sites/agilize-com-br-d8fa62a2/shared/Header";
import { Footer } from "@/components/sites/agilize-com-br-d8fa62a2/shared/Footer";
import { CltPjCalculator } from "./CltPjCalculator";

export const metadata: Metadata = {
  title: "Calculadora CLT x PJ | Infinity Contabilidade",
  description:
    "Compare seu salário como CLT e como PJ e veja quanto você precisaria faturar como pessoa jurídica para manter o mesmo padrão de vida.",
  alternates: { canonical: "/calculadora-clt-pj" },
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-10">
          <h1 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
            Calculadora CLT x PJ
          </h1>
          <p className="mt-4 text-muted-foreground">
            Compare de forma simples o salário líquido como CLT com o
            faturamento que você precisaria ter como PJ para manter o mesmo
            padrão de vida. Preencha os dados abaixo.
          </p>

          <CltPjCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}
