"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/tax-calculators";

type Regime = "simples" | "presumido" | "real";
type Setor = "padrao" | "reduzido" | "isento";

const ALIQUOTA_ATUAL_ILUSTRATIVA: Record<Regime, number> = {
  simples: 0.08,
  presumido: 0.1133,
  real: 0.14,
};

const REGIME_LABEL: Record<Regime, string> = {
  simples: "Simples Nacional",
  presumido: "Lucro Presumido",
  real: "Lucro Real",
};

// CBS "cheia" a partir de 2027, substituindo PIS/Cofins — alíquota de
// referência ilustrativa. IBS ainda não começou a substituir ICMS/ISS nessa
// fase (isso só ocorre gradualmente entre 2029 e 2033).
const ALIQUOTA_CBS_2027 = 0.088;

// Alíquota de referência combinada IBS + CBS quando a reforma estiver
// totalmente implementada (fim da transição, 2033), substituindo PIS,
// Cofins, ICMS, ISS e IPI.
const ALIQUOTA_IBS_CBS_2033 = 0.265;

const SETOR_LABEL: Record<Setor, { label: string; fator: number }> = {
  padrao: { label: "Padrão (sem redução)", fator: 1 },
  reduzido: { label: "Redução de 60% (ex.: saúde, educação)", fator: 0.4 },
  isento: { label: "Isento / cesta básica", fator: 0 },
};

export function ReformaTributariaCalculator() {
  const [regime, setRegime] = useState<Regime>("simples");
  const [setor, setSetor] = useState<Setor>("padrao");
  const [faturamento, setFaturamento] = useState("");
  const [showResult, setShowResult] = useState(false);

  const valorFaturamento = parseFloat(faturamento.replace(/[^\d,]/g, "").replace(",", ".")) || 0;

  const aliquotaAtual = ALIQUOTA_ATUAL_ILUSTRATIVA[regime];
  const impostoAtual = valorFaturamento * aliquotaAtual;

  const fator = SETOR_LABEL[setor].fator;
  const imposto2033 = valorFaturamento * (ALIQUOTA_IBS_CBS_2033 * fator);

  const diferenca2033 = imposto2033 - impostoAtual;

  return (
    <div className="mt-10">
      <div className="rounded-3xl border border-border bg-muted p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="flex min-h-10 items-center">Qual o seu regime tributário atual?</span>
            <select
              value={regime}
              onChange={(e) => setRegime(e.target.value as Regime)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-foreground"
            >
              {Object.entries(REGIME_LABEL).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="flex min-h-10 items-center">Sua atividade tem redução de alíquota na reforma?</span>
            <select
              value={setor}
              onChange={(e) => setSetor(e.target.value as Setor)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-foreground"
            >
              {Object.entries(SETOR_LABEL).map(([key, v]) => (
                <option key={key} value={key}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            <span className="flex min-h-10 items-center">Quanto sua empresa fatura, em média, por mês?</span>
            <input
              inputMode="decimal"
              placeholder="R$ 0,00"
              value={faturamento}
              onChange={(e) => setFaturamento(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground"
            />
          </label>
        </div>

        <Button
          className="mt-6 h-11 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto sm:px-8"
          disabled={valorFaturamento <= 0}
          onClick={() => setShowResult(true)}
        >
          Simular impacto
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Simulação ilustrativa e simplificada, com base em alíquotas de
          referência publicadas para a Reforma Tributária (IBS + CBS) e em
          médias de carga tributária por regime. Não considera créditos
          tributários nem particularidades da sua atividade — fale com um
          especialista para uma análise real.
        </p>
      </div>

      {showResult && valorFaturamento > 0 && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-accent bg-accent/10 p-6">
            <p className="font-heading text-base font-bold text-foreground">
              Agora (setembro/2026) — fase de testes
            </p>
            <p className="mt-2 text-sm text-foreground/85">
              Desde janeiro de 2026, CBS (0,9%) e IBS (0,1%) já são
              destacados nas notas fiscais em caráter de teste, mas{" "}
              <strong>sem cobrança efetiva</strong> — o valor é compensado
              integralmente com PIS/Cofins. Na prática, sua carga tributária
              hoje continua sendo a do regime atual.
            </p>
            <p className="mt-3 text-2xl font-extrabold text-foreground">
              {formatBRL(impostoAtual)}
              <span className="text-sm font-medium text-muted-foreground">/mês</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Carga tributária média ilustrativa de {(aliquotaAtual * 100).toFixed(2)}% ({REGIME_LABEL[regime]})
            </p>
          </div>

          <div className="rounded-2xl border border-border p-6">
            <p className="font-heading text-base font-bold text-foreground">
              A partir de 2027 — CBS substitui PIS/Cofins
            </p>
            <p className="mt-2 text-sm text-foreground/85">
              A CBS entra em vigor com alíquota cheia (referência de{" "}
              {(ALIQUOTA_CBS_2027 * 100).toFixed(1)}%), extinguindo PIS e
              Cofins. O IBS ainda não substitui ICMS/ISS nesta etapa — isso
              só começa em 2029.
            </p>
          </div>

          <div className="rounded-2xl border border-primary bg-secondary p-6">
            <p className="font-heading text-base font-bold text-foreground">
              Reforma totalmente implementada (2033)
            </p>
            <p className="mt-2 text-sm text-foreground/85">
              Com a transição completa, IBS + CBS substituem PIS, Cofins,
              ICMS, ISS e IPI.
            </p>
            <p className="mt-3 text-3xl font-extrabold text-primary">
              {formatBRL(imposto2033)}
              <span className="text-sm font-medium text-muted-foreground">/mês</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Alíquota de referência de {(ALIQUOTA_IBS_CBS_2033 * fator * 100).toFixed(2)}% ({SETOR_LABEL[setor].label})
            </p>
          </div>

          <div className="rounded-2xl bg-muted p-6">
            <p className="text-sm text-foreground/85">
              Diferença estimada até 2033:{" "}
              <strong className={diferenca2033 > 0 ? "text-destructive" : "text-accent"}>
                {diferenca2033 > 0 ? "+" : ""}
                {formatBRL(diferenca2033)}/mês
              </strong>{" "}
              em relação à carga tributária atual — este valor é apenas uma
              referência inicial para você se planejar.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl bg-primary p-6 text-center text-primary-foreground">
        <p className="font-heading text-lg font-bold">
          Quer entender como a reforma afeta exatamente o seu negócio?
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
