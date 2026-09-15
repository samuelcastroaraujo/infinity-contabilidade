"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { calcularCLT, calcularPJNecessario, formatBRL } from "@/lib/tax-calculators";

function parseCurrency(value: string): number {
  const digits = value.replace(/[^\d,]/g, "").replace(",", ".");
  const n = parseFloat(digits);
  return Number.isFinite(n) ? n : 0;
}

function CurrencyField({
  label,
  value,
  onChange,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span>
        {label}{" "}
        <span className={optional ? "text-xs text-muted-foreground" : "text-xs text-muted-foreground invisible"}>
          (opcional)
        </span>
      </span>
      <input
        inputMode="decimal"
        placeholder="R$ 0,00"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-lg border border-border bg-background px-3 text-foreground placeholder:text-muted-foreground"
      />
    </label>
  );
}

export function CltPjCalculator() {
  const [salario, setSalario] = useState("");
  const [valeRefeicao, setValeRefeicao] = useState("");
  const [valeTransporte, setValeTransporte] = useState("");
  const [planoSaude, setPlanoSaude] = useState("");
  const [outros, setOutros] = useState("");
  const [showResult, setShowResult] = useState(false);

  const inputs = {
    salarioBruto: parseCurrency(salario),
    valeRefeicao: parseCurrency(valeRefeicao),
    valeTransporte: parseCurrency(valeTransporte),
    planoSaude: parseCurrency(planoSaude),
    outrosBeneficios: parseCurrency(outros),
  };

  const cltResultado = calcularCLT(inputs);
  const custoBeneficiosEquivalentes = inputs.valeRefeicao + inputs.valeTransporte + inputs.planoSaude + inputs.outrosBeneficios;
  const pjResultado = calcularPJNecessario(cltResultado.valorTotalMensal, custoBeneficiosEquivalentes);

  return (
    <div className="mt-10">
      <div className="rounded-3xl border border-border bg-muted p-6 sm:p-8">
        <p className="font-heading text-lg font-bold text-foreground">
          Preencha os seus dados como CLT
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CurrencyField label="Salário mensal bruto" value={salario} onChange={setSalario} />
          <CurrencyField label="Vale-refeição / alimentação" value={valeRefeicao} onChange={setValeRefeicao} optional />
          <CurrencyField label="Vale-transporte" value={valeTransporte} onChange={setValeTransporte} optional />
          <CurrencyField label="Plano de saúde" value={planoSaude} onChange={setPlanoSaude} optional />
          <CurrencyField label="Outros benefícios" value={outros} onChange={setOutros} optional />
        </div>

        <Button
          className="mt-6 h-11 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto sm:px-8"
          disabled={inputs.salarioBruto <= 0}
          onClick={() => setShowResult(true)}
        >
          Ver resultado
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Ao utilizar esta ferramenta, você concorda que os valores
          apresentados são estimativas simplificadas com base nas tabelas
          públicas de INSS e IRPF vigentes em 2026, e não substituem uma
          análise contábil individualizada.
        </p>
      </div>

      {showResult && inputs.salarioBruto > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-6">
            <p className="font-heading text-base font-bold text-foreground">
              Como CLT
            </p>
            <dl className="mt-4 space-y-2.5 text-sm">
              <Row label="INSS" value={formatBRL(cltResultado.inss)} negative />
              <Row label="IRPF" value={formatBRL(cltResultado.irpf)} negative />
              <Row label="Salário líquido" value={formatBRL(cltResultado.liquidoMensal)} strong />
              <Row label="Benefícios (vale, plano etc.)" value={formatBRL(cltResultado.beneficiosTotal)} />
              <Row label="13º salário (proporcional/mês)" value={formatBRL(cltResultado.decimoTerceiroProrated)} />
              <Row label="Férias + 1/3 (proporcional/mês)" value={formatBRL(cltResultado.feriasProrated)} />
              <Row label="FGTS (proporcional/mês)" value={formatBRL(cltResultado.fgtsProrated)} />
              <Row label="Valor total mensal equivalente" value={formatBRL(cltResultado.valorTotalMensal)} strong />
              <Row
                label="Valor total anual equivalente"
                value={formatBRL(cltResultado.valorTotalMensal * 12)}
              />
              <Row
                label="Carga de INSS + IRPF sobre o bruto"
                value={`${(((cltResultado.inss + cltResultado.irpf) / inputs.salarioBruto) * 100).toFixed(1)}%`}
              />
            </dl>
          </div>

          <div className="rounded-2xl border border-primary bg-secondary p-6">
            <p className="font-heading text-base font-bold text-foreground">
              Como PJ, para manter o mesmo padrão
            </p>
            <dl className="mt-4 space-y-2.5 text-sm">
              <Row
                label="Faturamento mensal necessário"
                value={formatBRL(pjResultado.faturamentoNecessario)}
                strong
              />
              <Row
                label={`Simples Nacional (Anexo III, ${(pjResultado.aliquotaSimples * 100).toFixed(0)}% ilustrativo)`}
                value={formatBRL(pjResultado.impostoSimples)}
                negative
              />
              <Row label="INSS sobre pró-labore (1 salário mínimo)" value={formatBRL(pjResultado.inssProlabore)} negative />
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">
              Considera Simples Nacional, Anexo III, 1ª faixa (alíquota
              ilustrativa). A alíquota real depende do faturamento acumulado
              dos últimos 12 meses e do Fator R da sua atividade — fale com
              um especialista para o cálculo exato do seu caso.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl bg-primary p-6 text-center text-primary-foreground">
        <p className="font-heading text-lg font-bold">
          Quer um cálculo com o enquadramento exato da sua atividade?
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

function Row({
  label,
  value,
  strong,
  negative,
}: {
  label: string;
  value: string;
  strong?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={
          strong
            ? "font-heading font-bold text-foreground"
            : negative
              ? "text-destructive"
              : "text-foreground/85"
        }
      >
        {negative ? `- ${value}` : value}
      </dd>
    </div>
  );
}
