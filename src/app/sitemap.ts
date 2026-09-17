import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  "/",
  "/calculadora-de-custo-para-tirar-cnpj",
  "/calculadora-clt-pj",
  "/calculadora-reforma-tributaria",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date("2026-09-17"),
  }));
}
