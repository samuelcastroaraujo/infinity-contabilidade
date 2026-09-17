"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/tax-calculators";
import municipiosBrasil from "@/lib/municipios-brasil.json";

type Natureza = "mei" | "me";
type Risco = "baixo" | "medio" | "alto";

interface Atividade {
  label: string;
  risco: Risco;
  licencasExtras: string[];
}

const ATIVIDADES: Atividade[] = [
  { label: "Escritório administrativo / Consultoria", risco: "baixo", licencasExtras: [] },
  { label: "Tecnologia / Desenvolvimento de software", risco: "baixo", licencasExtras: [] },
  { label: "Comércio varejista (loja física)", risco: "medio", licencasExtras: [] },
  { label: "Comércio atacadista", risco: "medio", licencasExtras: [] },
  { label: "Prestação de serviços em geral", risco: "baixo", licencasExtras: [] },
  { label: "Alimentação (restaurante, lanchonete)", risco: "alto", licencasExtras: ["Licença sanitária (Vigilância Sanitária)", "Corpo de Bombeiros"] },
  { label: "Saúde (clínica, consultório)", risco: "alto", licencasExtras: ["Licença sanitária (Vigilância Sanitária)", "Registro no conselho de classe"] },
  { label: "Beleza e estética (salão, barbearia)", risco: "medio", licencasExtras: ["Licença sanitária (Vigilância Sanitária)"] },
  { label: "Construção civil", risco: "alto", licencasExtras: ["Licença ambiental (se aplicável)", "Corpo de Bombeiros"] },
  { label: "Indústria / Fabricação", risco: "alto", licencasExtras: ["Licença ambiental", "Corpo de Bombeiros"] },
  { label: "Transporte / Logística", risco: "medio", licencasExtras: ["Registro no órgão de trânsito (se aplicável)"] },
  { label: "Educação (curso, escola)", risco: "alto", licencasExtras: ["Licença sanitária", "Corpo de Bombeiros", "Autorização do órgão de educação"] },
];

const RISCO_ALVARA_RANGE: Record<Risco, { min: number; max: number; prazo: string }> = {
  baixo: { min: 0, max: 250, prazo: "emissão imediata/automática (Redesim)" },
  medio: { min: 150, max: 700, prazo: "alguns dias após vistoria simplificada" },
  alto: { min: 300, max: 1500, prazo: "sujeito a vistoria prévia — pode levar semanas" },
};

// Multiplicador regional ilustrativo: capitais e grandes centros tendem a
// ter taxas municipais mais altas que cidades de menor porte. Isto é uma
// aproximação didática, não um valor oficial por município.
function multiplicadorRegional(cidade: string): number {
  const capitais = [
    "São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte", "Salvador",
    "Curitiba", "Fortaleza", "Recife", "Porto Alegre", "Goiânia", "Manaus",
    "Belém", "Campo Grande", "Vitória", "Florianópolis",
  ];
  return capitais.includes(cidade) ? 1.3 : 1;
}

function parseCurrency(value: string): number {
  const n = parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function CustoCnpjCalculator() {
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [atividadeLabel, setAtividadeLabel] = useState(ATIVIDADES[0].label);
  const [natureza, setNatureza] = useState<Natureza>("mei");
  const [faturamento, setFaturamento] = useState("");
  const [showResult, setShowResult] = useState(false);

  const cidades = uf ? (municipiosBrasil.municipiosPorEstado as Record<string, string[]>)[uf] ?? [] : [];
  const atividade = ATIVIDADES.find((a) => a.label === atividadeLabel)!;
  const mult = cidade ? multiplicadorRegional(cidade) : 1;

  const itens = useMemo(() => {
    const registro =
      natureza === "mei"
        ? { nome: "Registro do CNPJ (Portal do Empreendedor / Redesim)", min: 0, max: 0 }
        : { nome: "Taxas de registro na Junta Comercial", min: Math.round(100 * mult), max: Math.round(450 * mult) };

    const certificado = { nome: "Certificado digital e-CNPJ", min: natureza === "mei" ? 0 : 150, max: natureza === "mei" ? 200 : 300 };

    const alvaraFaixa = RISCO_ALVARA_RANGE[atividade.risco];
    const alvara = {
      nome: `Alvará de funcionamento (${atividade.risco === "baixo" ? "baixo risco" : atividade.risco === "medio" ? "médio risco" : "alto risco"})`,
      min: Math.round(alvaraFaixa.min * mult),
      max: Math.round(alvaraFaixa.max * mult),
    };

    const licencas = atividade.licencasExtras.map((nome) => ({
      nome,
      min: Math.round(150 * mult),
      max: Math.round(600 * mult),
    }));

    return [registro, certificado, alvara, ...licencas];
  }, [natureza, atividade, mult]);

  const totalMin = itens.reduce((acc, i) => acc + i.min, 0);
  const totalMax = itens.reduce((acc, i) => acc + i.max, 0);
  const valorFaturamento = parseCurrency(faturamento);

  return (
    <div className="mt-10">
      <div className="rounded-3xl border border-border bg-muted p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="flex min-h-10 items-center">Em qual estado você pretende abrir sua empresa?</span>
            <select
              value={uf}
              onChange={(e) => {
                setUf(e.target.value);
                setCidade("");
              }}
              className="h-11 rounded-lg border border-border bg-background px-3 text-foreground"
            >
              <option value="">Selecione um estado</option>
              {municipiosBrasil.estados.map((e) => (
                <option key={e.sigla} value={e.sigla}>
                  {e.nome} ({e.sigla})
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="flex min-h-10 items-center">Em qual cidade?</span>
            <select
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              disabled={!uf}
              className="h-11 rounded-lg border border-border bg-background px-3 text-foreground disabled:opacity-50"
            >
              <option value="">{uf ? "Selecione uma cidade" : "Selecione o estado primeiro"}</option>
              {cidades.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            <span className="flex min-h-10 items-center">Qual atividade você exerce ou pretende exercer?</span>
            <select
              value={atividadeLabel}
              onChange={(e) => setAtividadeLabel(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-foreground"
            >
              {ATIVIDADES.map((a) => (
                <option key={a.label} value={a.label}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="flex min-h-10 items-center">Qual o porte da sua empresa?</span>
            <select
              value={natureza}
              onChange={(e) => setNatureza(e.target.value as Natureza)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-foreground"
            >
              <option value="mei">MEI (Microempreendedor Individual)</option>
              <option value="me">Microempresa / Empresa de Pequeno Porte</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="flex min-h-10 items-center">Faturamento mensal previsto</span>
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
          disabled={!uf || !cidade}
          onClick={() => setShowResult(true)}
        >
          Calcular o custo estimado
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Estimativa educacional com base em faixas típicas praticadas no
          Brasil e no grau de risco da atividade (Redesim). Os valores reais
          são definidos por cada prefeitura e pelo CNAE exato da atividade —
          fale com um especialista para o valor exato em {cidade || "sua cidade"}
          {uf ? `/${uf}` : ""}.
        </p>
      </div>

      {showResult && uf && cidade && (
        <div className="mt-8 rounded-2xl border border-border p-6">
          <p className="font-heading text-base font-bold text-foreground">
            Estimativa para {atividadeLabel} em {cidade}/{uf}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Grau de risco: {atividade.risco === "baixo" ? "baixo" : atividade.risco === "medio" ? "médio" : "alto"} — {RISCO_ALVARA_RANGE[atividade.risco].prazo}
          </p>

          <dl className="mt-5 space-y-2.5 text-sm">
            {itens.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
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
            <p className="font-heading font-bold text-foreground">Total estimado de abertura</p>
            <p className="font-heading text-lg font-bold text-primary">
              {formatBRL(totalMin)} — {formatBRL(totalMax)}
            </p>
          </div>

          {valorFaturamento > 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              Com faturamento previsto de {formatBRL(valorFaturamento)}/mês, o
              enquadramento tributário e o custo da contabilidade recorrente
              variam — fale com a gente para uma proposta completa.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 rounded-2xl bg-primary p-6 text-center text-primary-foreground">
        <p className="font-heading text-lg font-bold">
          Quer o valor exato para a sua cidade e atividade?
        </p>
        <Button
          className="mt-4 h-11 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
          nativeButton={false}
          render={<Link href="/#contato">Falar com um especialista</Link>}
        />
      </div>
    </div>
  );
}
