import type { Metadata } from "next";
import { Header } from "@/components/sites/agilize-com-br-d8fa62a2/shared/Header";
import { Footer } from "@/components/sites/agilize-com-br-d8fa62a2/shared/Footer";
import { ReformaTributariaCalculator } from "./ReformaTributariaCalculator";

export const metadata: Metadata = {
  title: "Calculadora da Reforma Tributária | Infinity Contabilidade",
  description:
    "Simule, de forma ilustrativa, o impacto da Reforma Tributária (IBS e CBS) no seu negócio.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-10">
          <h1 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
            Calculadora da Reforma Tributária
          </h1>
          <p className="mt-4 text-muted-foreground">
            Simule de forma ilustrativa o impacto da transição para o novo
            sistema de IBS e CBS no seu negócio, com base nos parâmetros de
            referência publicados até o momento.
          </p>

          <ReformaTributariaCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}
