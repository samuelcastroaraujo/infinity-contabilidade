// Simplified Brazilian payroll/tax calculators based on public 2025 tables
// (INSS, IRPF, salário mínimo, Simples Nacional Anexo III). These are
// educational estimates — always disclosed as such in the UI — not a
// substitute for a real accounting consultation.

export const SALARIO_MINIMO_2025 = 1518;

const INSS_FAIXAS = [
  { ate: 1518.0, aliquota: 0.075 },
  { ate: 2793.88, aliquota: 0.09 },
  { ate: 4190.83, aliquota: 0.12 },
  { ate: 8157.41, aliquota: 0.14 },
];

export function calcularINSS(salarioBruto: number): number {
  const base = Math.min(salarioBruto, INSS_FAIXAS[INSS_FAIXAS.length - 1].ate);
  let inss = 0;
  let faixaAnterior = 0;
  for (const faixa of INSS_FAIXAS) {
    if (base > faixaAnterior) {
      const valorNaFaixa = Math.min(base, faixa.ate) - faixaAnterior;
      inss += valorNaFaixa * faixa.aliquota;
      faixaAnterior = faixa.ate;
    }
  }
  return round2(inss);
}

const IRPF_FAIXAS = [
  { ate: 2259.2, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { ate: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { ate: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { ate: Infinity, aliquota: 0.275, deducao: 896.0 },
];

export function calcularIRPF(salarioBruto: number, inss: number): number {
  const base = salarioBruto - inss;
  // Faixa de isenção ampliada (Lei 14.848/2024): rendimentos brutos até
  // R$ 2.824 ficam, na prática, isentos por meio de redutor. Simplificado aqui.
  if (salarioBruto <= 2824) return 0;
  const faixa = IRPF_FAIXAS.find((f) => base <= f.ate) ?? IRPF_FAIXAS[IRPF_FAIXAS.length - 1];
  const irpf = base * faixa.aliquota - faixa.deducao;
  return round2(Math.max(0, irpf));
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
  const inssProlabore = round2(SALARIO_MINIMO_2025 * INSS_PROLABORE_ALIQUOTA);
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
