"use client";

import { useId, useSyncExternalStore } from "react";

// Path exato fornecido pelo cliente (logo-vetorizada.svg, viewBox original
// 0 0 2170 725). Não alterar as coordenadas — é o traçado oficial da marca.
const LOGO_PATH =
  "M16565 6874 c-665 -33 -1069 -81 -1620 -194 -1016 -208 -2048 -617 -2940 -1165 -400 -246 -717 -474 -1044 -752 -42 -36 -36 -65 7 -37 152 101 735 407 977 514 777 343 1701 587 2610 689 472 54 1107 76 1490 52 728 -45 1316 -163 1843 -371 505 -199 906 -453 1227 -775 181 -182 297 -340 395 -540 112 -228 145 -373 137 -605 -8 -217 -51 -362 -170 -572 -322 -565 -1073 -1003 -2027 -1182 -941 -177 -2090 -79 -3121 264 -699 234 -1292 536 -1898 969 -336 241 -567 427 -1216 982 -657 561 -987 820 -1425 1115 -983 662 -2085 1117 -3239 1335 -761 144 -1476 182 -2139 113 -1261 -130 -2273 -536 -3059 -1228 -580 -510 -929 -1135 -1004 -1796 -17 -149 -7 -435 20 -571 27 -135 72 -296 110 -390 309 -778 1067 -1398 2122 -1737 443 -143 878 -224 1404 -263 204 -15 702 -15 910 0 891 65 1807 279 2670 626 607 244 1052 476 1571 821 305 203 704 506 673 512 -8 1 -73 -25 -145 -58 -409 -194 -1009 -424 -1449 -556 -506 -152 -1000 -262 -1504 -334 -705 -101 -1462 -106 -2090 -14 -856 125 -1553 406 -2058 831 -297 250 -500 549 -580 853 -19 72 -26 131 -30 240 -8 221 21 350 127 565 251 509 868 918 1642 1090 173 38 402 72 580 85 198 16 667 8 868 -15 792 -88 1597 -331 2350 -711 496 -250 929 -530 1400 -908 291 -233 364 -296 950 -821 777 -695 1332 -1103 1957 -1438 1297 -695 2939 -1057 4578 -1007 788 24 1401 117 2063 315 1238 369 2161 1035 2581 1863 325 641 370 1288 135 1947 -89 249 -282 580 -467 800 -758 901 -2160 1431 -3857 1459 -135 2 -276 2 -315 0z";

/*
 * Efeito de luz — camada isolada, ligada/desligada pela prop `animated`.
 *
 * A logo é um preenchimento (stroke="none"), então não existe stroke-width
 * para copiar. Medido no browser (getTotalLength / getPointAtLength):
 *   L (contorno)          = 88 909,5 unidades do path
 *   largura da fita (W)   = 1 344 (mediana; p10 557 nas pontas, p90 1 643)
 * A trilha da luz é a LINHA CENTRAL da fita, derivada do próprio `d` em
 * tempo de execução (pareamento das duas bordas → pontos médios). Nada é
 * desenhado à mão. Exceção consciente à regra "só clone/<use>": a linha
 * central é uma polyline calculada a partir do `d`, não um shape novo.
 */
const RIBBON_WIDTH = 1344;
const DASH_FRACTION = 0.01; // comprimento do feixe = 1% da trilha (ponto de luz)
const PERIOD_S = 3;
const FADE_STEPS = { core: 6, halo: 4 };

// Blur em unidades do path, proporcional à fita (≈ 6px e 18px na escala do Hero,
// onde a fita mede ~32px) — assim o glow escala junto com a marca.
const BLUR_MID = RIBBON_WIDTH * 0.19;
const BLUR_OUTER = RIBBON_WIDTH * 0.56;

type Pt = [number, number];
type Trail = { d: string; length: number; crossing: Pt };
const CROSSING_FILL_WIDTH = RIBBON_WIDTH * 2.0; // brilho extra na sobreposição das faixas
const CROSSING_RADIUS = RIBBON_WIDTH * 2.6;     // alcance da máscara radial no cruzamento

function deriveCenterline(logoPath: string): Trail | null {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  const path = document.createElementNS(NS, "path");
  path.setAttribute("d", logoPath);
  svg.appendChild(path);
  document.body.appendChild(svg);

  try {
    const L = path.getTotalLength();
    const N = 1600;
    const pts: Pt[] = [];
    for (let i = 0; i < N; i++) {
      const p = path.getPointAtLength((L * i) / N);
      pts.push([p.x, p.y]);
    }

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    let iMin = 0, iMax = 0;
    pts.forEach(([x, y], i) => {
      if (x < minX) { minX = x; iMin = i; }
      if (x > maxX) { maxX = x; iMax = i; }
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    });
    const W = maxX - minX;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    // Ponto médio entre cada ponto da borda e o ponto mais próximo da borda
    // OPOSTA. "Oposta" = tangente do contorno em sentido contrário (as duas
    // bordas da fita correm em direções opostas). Esse critério, ao contrário
    // de excluir vizinhos por índice, funciona também nas pontas — onde os
    // pares corretos são exatamente os pontos vizinhos dos dois lados da dobra.
    const unitV = (v: Pt): Pt => { const m = Math.hypot(v[0], v[1]) || 1; return [v[0] / m, v[1] / m]; };
    const tang: Pt[] = pts.map((_, i) => {
      const a = pts[(i - 1 + N) % N], b = pts[(i + 1) % N];
      return unitV([b[0] - a[0], b[1] - a[1]]);
    });
    const maxPair2 = (RIBBON_WIDTH * 1.6) ** 2;
    const mids: Pt[] = [];
    for (let i = 0; i < N; i++) {
      let best = Infinity, bj = -1;
      const [xi, yi] = pts[i];
      const [tx, ty] = tang[i];
      for (let j = 0; j < N; j++) {
        const dd = Math.abs(i - j);
        if (Math.min(dd, N - dd) < 2) continue;
        if (tx * tang[j][0] + ty * tang[j][1] > -0.3) continue; // mesma borda: ignora
        const dx = xi - pts[j][0], dy = yi - pts[j][1];
        const d2 = dx * dx + dy * dy;
        if (d2 < best) { best = d2; bj = j; }
      }
      if (bj >= 0 && best < maxPair2) mids.push([(xi + pts[bj][0]) / 2, (yi + pts[bj][1]) / 2]);
    }

    // Quatro arcos (TL, BR, TR, BL) ordenados por ângulo em torno do centro
    // de cada laço; o cruzamento é o ponto central explícito.
    const lcx = cx - W / 4, rcx = cx + W / 4;
    // No cruzamento as duas fitas se sobrepõem e o pareamento de bordas gera
    // pontos médios deslocados; descartamos essa região inteira e deixamos os
    // arcos se ligarem em linha reta — a fita atravessa o centro quase reta.
    const centerR = RIBBON_WIDTH * 1.5;
    const BINS = 64;
    type Bin = { sx: number; sy: number; n: number };
    const mk = (): Bin[] => Array.from({ length: BINS }, () => ({ sx: 0, sy: 0, n: 0 }));
    const TL = mk(), BL = mk(), TR = mk(), BR = mk();
    for (const [x, y] of mids) {
      if (Math.hypot(x - cx, y - cy) < centerR) continue;
      const left = x < cx;
      const upper = y >= cy;
      const ang = Math.atan2(y - cy, x - (left ? lcx : rcx));
      let arc: Bin[], t: number;
      if (left) {
        if (upper) { arc = TL; t = (Math.PI - ang) / Math.PI; } // ponta → centro
        else { arc = BL; t = -ang / Math.PI; }                    // centro → ponta
      } else {
        if (upper) { arc = TR; t = ang / Math.PI; }               // ponta → centro
        else { arc = BR; t = (Math.PI + ang) / Math.PI; }         // centro → ponta
      }
      const b = Math.min(BINS - 1, Math.max(0, Math.floor(t * BINS)));
      arc[b].sx += x; arc[b].sy += y; arc[b].n++;
    }
    // Cada arco é suavizado isoladamente (média móvel de 5, bordas fixas) para
    // tirar o serrilhado dos bins sem contaminar as emendas do cruzamento.
    const seq = (arc: Bin[]): Pt[] => {
      const p: Pt[] = arc.filter((b) => b.n > 0).map((b) => [b.sx / b.n, b.sy / b.n]);
      return p.map((_, i) => {
        const lo = Math.max(0, i - 2), hi = Math.min(p.length - 1, i + 2);
        let sx = 0, sy = 0;
        for (let k = lo; k <= hi; k++) { sx += p[k][0]; sy += p[k][1]; }
        const m = hi - lo + 1;
        return [sx / m, sy / m];
      });
    };

    const leftTip = pts[iMin], rightTip = pts[iMax];
    const aTL = seq(TL), aBR = seq(BR), aTR = seq(TR), aBL = seq(BL);

    // Emendas com continuidade de tangente (Hermite cúbica): entre os arcos,
    // pelo cruzamento, e na chegada/saída das pontas, onde a fita dobra ao
    // longo do eixo x. Sem isso a luz anda reta enquanto a fita curva e
    // "corrige" no fim do trecho — o mini pulo.
    const unit = (v: Pt): Pt => { const m = Math.hypot(v[0], v[1]) || 1; return [v[0] / m, v[1] / m]; };
    const tangentOut = (arc: Pt[]): Pt => unit([arc[arc.length - 1][0] - arc[arc.length - 3][0], arc[arc.length - 1][1] - arc[arc.length - 3][1]]);
    const tangentIn = (arc: Pt[]): Pt => unit([arc[2][0] - arc[0][0], arc[2][1] - arc[0][1]]);
    const hermite = (p0: Pt, t0: Pt, p1: Pt, t1: Pt): Pt[] => {
      const dist = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
      const k = dist / 3;
      const c0: Pt = [p0[0] + t0[0] * k, p0[1] + t0[1] * k];
      const c1: Pt = [p1[0] - t1[0] * k, p1[1] - t1[1] * k];
      const samples = Math.max(4, Math.round(dist / 180));
      const out: Pt[] = [];
      for (let s = 1; s < samples; s++) {
        const u = s / samples, v = 1 - u;
        out.push([
          v * v * v * p0[0] + 3 * v * v * u * c0[0] + 3 * v * u * u * c1[0] + u * u * u * p1[0],
          v * v * v * p0[1] + 3 * v * v * u * c0[1] + 3 * v * u * u * c1[1] + u * u * u * p1[1],
        ]);
      }
      return out;
    };
    const RIGHT: Pt = [1, 0], LEFT: Pt = [-1, 0];

    // Ordem da fita: ponta esq → arco sup. esq → cruzamento → arco inf. dir →
    // ponta dir → arco sup. dir → cruzamento → arco inf. esq → (fecha)
    const loop: Pt[] = [
      leftTip,
      ...hermite(leftTip, RIGHT, aTL[0], tangentIn(aTL)),
      ...aTL,
      ...hermite(aTL[aTL.length - 1], tangentOut(aTL), aBR[0], tangentIn(aBR)),
      ...aBR,
      ...hermite(aBR[aBR.length - 1], tangentOut(aBR), rightTip, RIGHT),
      rightTip,
      ...hermite(rightTip, LEFT, aTR[0], tangentIn(aTR)),
      ...aTR,
      ...hermite(aTR[aTR.length - 1], tangentOut(aTR), aBL[0], tangentIn(aBL)),
      ...aBL,
      ...hermite(aBL[aBL.length - 1], tangentOut(aBL), leftTip, LEFT),
    ];
    const n = loop.length;

    let length = 0;
    for (let i = 0; i < n; i++) {
      const a = loop[i], b = loop[(i + 1) % n];
      length += Math.hypot(b[0] - a[0], b[1] - a[1]);
    }
    const d = loop.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(0)} ${y.toFixed(0)}`).join(" ") + " Z";
    // Centro real do cruzamento: média das extremidades das duas emendas.
    const ends = [aTL[aTL.length - 1], aBR[0], aTR[aTR.length - 1], aBL[0]];
    const crossing: Pt = [ends.reduce((s, p) => s + p[0], 0) / 4, ends.reduce((s, p) => s + p[1], 0) / 4];
    return { d, length, crossing };
  } finally {
    svg.remove();
  }
}

// Cópias escalonadas do mesmo feixe, centradas e com opacidade decrescente,
// para que ponta e cauda desvaneçam em vez de terminar em corte reto.
function FadedBeam({ d, strokeWidth, steps, opacity }: { d: string; strokeWidth: number; steps: number; opacity: number }) {
  const D = DASH_FRACTION * 100;
  return (
    <>
      {Array.from({ length: steps }, (_, k) => {
        const dash = (D * (steps - k)) / steps;
        const shift = (D - dash) / 2; // centraliza o traço mais curto dentro do maior
        return (
          <path
            key={k}
            d={d}
            pathLength={100}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${dash} ${100 - dash}`}
            opacity={Math.min(1, (opacity * 1.4) / steps)}
            className="il-dash"
            style={{ animationDelay: `${(-(shift / 100) * PERIOD_S).toFixed(3)}s` }}
          />
        );
      })}
    </>
  );
}

// A trilha depende de APIs de geometria do DOM (getPointAtLength), então só
// existe no cliente: no servidor/hidratação o snapshot é null (sem luz), e o
// cliente calcula uma vez e compartilha entre as instâncias (Hero, Footer).
let cachedTrail: Trail | null | undefined;
function getTrail(): Trail | null {
  if (cachedTrail === undefined) cachedTrail = deriveCenterline(LOGO_PATH);
  return cachedTrail;
}
const subscribeNoop = () => () => {};
const getServerTrail = () => null;

export function InfinityMark({
  className,
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  const trail = useSyncExternalStore(subscribeNoop, animated ? getTrail : getServerTrail, getServerTrail);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const clipId = `il-clip-${uid}`;
  const midId = `il-blur-mid-${uid}`;
  const outerId = `il-blur-outer-${uid}`;
  const crossGradId = `il-cross-grad-${uid}`;
  const crossMaskId = `il-cross-mask-${uid}`;

  return (
    <svg viewBox="0 0 300 100" fill="none" aria-hidden="true" overflow="visible" className={className}>
      <g transform="scale(0.13824,0.13793)">
        <g transform="translate(0,725) scale(0.1,-0.1)">
          <path d={LOGO_PATH} fill="currentColor" />

          {animated && trail && (
            <g
              className="il-effect"
              style={{ pointerEvents: "none", "--il-period": `${PERIOD_S}s` } as React.CSSProperties}
            >
              <defs>
                <clipPath id={clipId}>
                  <path d={LOGO_PATH} />
                </clipPath>
                <filter id={midId} x="-25%" y="-110%" width="150%" height="320%" primitiveUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation={BLUR_MID} />
                </filter>
                <filter id={outerId} x="-25%" y="-110%" width="150%" height="320%" primitiveUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation={BLUR_OUTER} />
                </filter>
                {/* região do cruzamento: máscara radial com borda suave */}
                <radialGradient
                  id={crossGradId}
                  gradientUnits="userSpaceOnUse"
                  cx={trail.crossing[0]}
                  cy={trail.crossing[1]}
                  r={CROSSING_RADIUS}
                >
                  <stop offset="0" stopColor="white" />
                  <stop offset="0.5" stopColor="white" />
                  <stop offset="1" stopColor="black" />
                </radialGradient>
                <mask id={crossMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="21700" height="7250">
                  <circle cx={trail.crossing[0]} cy={trail.crossing[1]} r={CROSSING_RADIUS} fill={`url(#${crossGradId})`} />
                </mask>
              </defs>

              {/* halo externo: difuso, sem recorte (é brilho ambiente) */}
              <g className="il-layer" filter={`url(#${outerId})`}>
                <FadedBeam d={trail.d} strokeWidth={RIBBON_WIDTH * 3.5} steps={FADE_STEPS.halo} opacity={0.12} />
              </g>

              {/* halo médio + núcleo: recortados pela silhueta da logo */}
              <g clipPath={`url(#${clipId})`}>
                <g className="il-layer" filter={`url(#${midId})`}>
                  <FadedBeam d={trail.d} strokeWidth={RIBBON_WIDTH * 2} steps={FADE_STEPS.halo} opacity={0.3} />
                </g>
                <g className="il-layer">
                  <FadedBeam d={trail.d} strokeWidth={RIBBON_WIDTH} steps={FADE_STEPS.core} opacity={1} />
                </g>
                {/* brilho mais largo só no cruzamento, onde as faixas se sobrepõem */}
                <g className="il-layer" mask={`url(#${crossMaskId})`} filter={`url(#${midId})`}>
                  <FadedBeam d={trail.d} strokeWidth={CROSSING_FILL_WIDTH} steps={FADE_STEPS.halo} opacity={0.55} />
                </g>
              </g>
            </g>
          )}
        </g>
      </g>
    </svg>
  );
}
