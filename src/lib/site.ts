// Domínio de produção real já em uso pela Infinity Contabilidade
// (https://www.infinitycontabilidade.net, confirmado ativo). Sobrescreva via
// NEXT_PUBLIC_SITE_URL se este redesign for publicado em outro domínio.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.infinitycontabilidade.net";

export const SITE_NAME = "Infinity Contabilidade";
