"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/tax-calculators";

type TipoEmpresa = "mei" | "servicos" | "comercio" | "industria";

const ITENS_POR_TIPO: Record<
  TipoEmpresa,
  { label: string; itens: { nome: string; min: number; max: number }[] }
> = {
  mei: {
    label: "MEI (Microempreendedor Individual)",
    itens: [
      { nome: "Registro do CNPJ (Portal do Empreendedor)", min: 0, max: 0 },
      { nome: "Certificado digital (opcional para MEI)", min: 0, max: 200 },
      { nome: "Alvará / licença municipal", min: 0, max: 300 },
    ],
  },
  servicos: {
    label: "Microempresa — Serviços",
    itens: [
      { nome: "Taxas de registro na Junta Comercial", min: 100, max: 400 },
      { nome: "Certificado digital e-CNPJ", min: 150, max: 300 },
      { nome: "Alvará de funcionamento", min: 100, max: 800 },
    ],
  },
  comercio: {
    label: "Microempresa — Comércio",
    itens: [
      { nome: "Taxas de registro na Junta Comercial", min: 150, max: 450 },
      { nome: "Certificado digital e-CNPJ", min: 150, max: 300 },
      { nome: "Alvará de funcionamento", min: 150, max: 1000 },
      { nome: "Licença sanitária / bombeiros (se aplicável)", min: 0, max: 600 },
    ],
  },
  industria: {
    label: "Microempresa — Indústria",
    itens: [
      { nome: "Taxas de registro na Junta Comercial", min: 200, max: 500 },
      { nome: "Certificado digital e-CNPJ", min: 150, max: 300 },
      { nome: "Alvará de funcionamento", min: 200, max: 1200 },
      { nome: "Licenças ambientais / bombeiros", min: 200, max: 1500 },
    ],
  },
};

export function CustoCnpjCalculator() {
  const [cidade, setCidade] = useState("");
  const [tipo, setTipo] = useState<TipoEmpresa>("mei");
  const [showResult, setShowResult] = useState(false);

  const config = ITENS_POR_TIPO[tipo];
  const totalMin = config.itens.reduce((acc, i) => acc + i.min, 0);
  const totalMax = config.itens.reduce((acc, i) => acc + i.max, 0);

  return (
    <div className="mt-10">
      <div className="rounded-3xl border border-border bg-muted p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            Em qual cidade você pretende abrir sua empresa?
            <input
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Ex.: Anápolis - GO"
              className="h-11 rounded-lg border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            Qual tipo de empresa você pretende abrir?
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoEmpresa)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-foreground"
            >
              {Object.entries(ITENS_POR_TIPO).map(([key, v]) => (
                <option key={key} value={key}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Button
          className="mt-6 h-11 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto sm:px-8"
          onClick={() => setShowResult(true)}
        >
          Calcular o custo estimado
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Estimativa com base em faixas típicas praticadas no Brasil. Os
          valores reais variam conforme a prefeitura e o CNAE da sua
          atividade — fale com um especialista para o valor exato em{" "}
          {cidade || "sua cidade"}.
        </p>
      </div>

      {showResult && (
        <div className="mt-8 rounded-2xl border border-border p-6">
          <p className="font-heading text-base font-bold text-foreground">
            Estimativa para {config.label}
            {cidade ? ` em ${cidade}` : ""}
          </p>
          <dl className="mt-4 space-y-2.5 text-sm">
            {config.itens.map((item) => (
              <div key={item.nome} className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">{item.nome}</dt>
                <dd className="text-foreground/85">
                  {item.min === item.max
                    ? item.min === 0
                      ? "Grátis"
                      : formatBRL(item.min)
                    : `${formatBRL(item.min)} — ${formatBRL(item.max)}`}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <p className="font-heading font-bold text-foreground">Total estimado</p>
            <p className="font-heading text-lg font-bold text-primary">
              {formatBRL(totalMin)} — {formatBRL(totalMax)}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl bg-primary p-6 text-center text-primary-foreground">
        <p className="font-heading text-lg font-bold">
          Quer o valor exato para a sua cidade e atividade?
        </p>
        <Button
          className="mt-4 h-11 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
          nativeButton={false}
          render={<a href="/#contato">Falar com um especialista</a>}
        />
      </div>
    </div>
  );
}
