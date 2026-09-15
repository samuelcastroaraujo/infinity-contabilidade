// Simplified Brazilian payroll/tax calculators based on public tables in
// force for 2026 (INSS, IRPF/Lei 15.270-2025, salário mínimo, Simples
// Nacional Anexo III, Reforma Tributária). These are educational estimates
// — always disclosed as such in the UI — not a substitute for a real
// accounting consultation.

export const SALARIO_MINIMO_2026 = 1621;

// INSS 2026 — tabela progressiva com dedução (fórmula: base × alíquota − dedução)
const INSS_FAIXAS = [
  { ate: 1621.0, aliquota: 0.075, deducao: 0 },
  { ate: 2902.84, aliquota: 0.09, deducao: 24.32 },
  { ate: 4354.27, aliquota: 0.12, deducao: 111.4 },
  { ate: 8475.55, aliquota: 0.14, deducao: 198.49 },
];
export const TETO_INSS_2026 = 8475.55;

export function calcularINSS(salarioBruto: number): number {
  const base = Math.min(salarioBruto, TETO_INSS_2026);
  const faixa = INSS_FAIXAS.find((f) => base <= f.ate) ?? INSS_FAIXAS[INSS_FAIXAS.length - 1];
  return round2(Math.max(0, base * faixa.aliquota - faixa.deducao));
}

// IRPF 2026 — tabela progressiva mensal "clássica" (Receita Federal)
const IRPF_FAIXAS = [
  { ate: 2428.8, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 182.16 },
  { ate: 3751.05, aliquota: 0.15, deducao: 394.16 },
  { ate: 4664.68, aliquota: 0.225, deducao: 675.49 },
  { ate: Infinity, aliquota: 0.275, deducao: 908.73 },
];

// Redutor do IRPF (Lei 15.270/2025) — zera o imposto até R$5.000 de
// rendimento bruto mensal e reduz progressivamente até R$7.350.
function calcularRedutorIRPF(rendimentoBruto: number): number {
  if (rendimentoBruto <= 5000) return Infinity; // cobre 100% do imposto
  if (rendimentoBruto > 7350) return 0;
  return Math.max(0, 978.62 - 0.133145 * rendimentoBruto);
}

export function calcularIRPF(salarioBruto: number, inss: number): number {
  const base = salarioBruto - inss;
  const faixa = IRPF_FAIXAS.find((f) => base <= f.ate) ?? IRPF_FAIXAS[IRPF_FAIXAS.length - 1];
  const tradicional = Math.max(0, base * faixa.aliquota - faixa.deducao);
  const redutor = calcularRedutorIRPF(salarioBruto);
  return round2(Math.max(0, tradicional - redutor));
}

export interface CltInputs {
  salarioBruto: number;
  valeRefeicao: number;
  valeTransporte: number;
  planoSaude: number;
  outrosBeneficios: number;
}

export interface CltResultado {
  inss: number;
  irpf: number;
  liquidoMensal: number;
  decimoTerceiroProrated: number;
  feriasProrated: number;
  fgtsProrated: number;
  beneficiosTotal: number;
  valorTotalMensal: number;
}

export function calcularCLT(inputs: CltInputs): CltResultado {
  const inss = calcularINSS(inputs.salarioBruto);
  const irpf = calcularIRPF(inputs.salarioBruto, inss);
  const liquidoMensal = round2(inputs.salarioBruto - inss - irpf);
  const decimoTerceiroProrated = round2(inputs.salarioBruto / 12);
  const feriasProrated = round2((inputs.salarioBruto * (4 / 3)) / 12);
  const fgtsProrated = round2(inputs.salarioBruto * 0.08);
  const beneficiosTotal = round2(
    inputs.valeRefeicao + inputs.valeTransporte + inputs.planoSaude + inputs.outrosBeneficios
  );
  const valorTotalMensal = round2(
    liquidoMensal + decimoTerceiroProrated + feriasProrated + fgtsProrated + beneficiosTotal
  );
  return { inss, irpf, liquidoMensal, decimoTerceiroProrated, feriasProrated, fgtsProrated, beneficiosTotal, valorTotalMensal };
}

// Simples Nacional — Anexo III, 1ª faixa (serviços), alíquota nominal
// ilustrativa. A alíquota efetiva real varia conforme faturamento
// acumulado dos últimos 12 meses e o Fator R.
const SIMPLES_ANEXO_III_FAIXA_1 = 0.06;
const INSS_PROLABORE_ALIQUOTA = 0.11;

export function calcularPJNecessario(valorTotalClt: number, custoBeneficiosEquivalentes: number) {
  const inssProlabore = round2(SALARIO_MINIMO_2026 * INSS_PROLABORE_ALIQUOTA);
  const numerador = valorTotalClt + inssProlabore + custoBeneficiosEquivalentes;
  const faturamentoNecessario = round2(numerador / (1 - SIMPLES_ANEXO_III_FAIXA_1));
  const impostoSimples = round2(faturamentoNecessario * SIMPLES_ANEXO_III_FAIXA_1);
  return {
    faturamentoNecessario,
    impostoSimples,
    inssProlabore,
    aliquotaSimples: SIMPLES_ANEXO_III_FAIXA_1,
  };
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
