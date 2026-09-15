import Link from "next/link";
import { Play, Camera, Briefcase, Share2 } from "lucide-react";
import { Logo } from "./Logo";

const COMPANY_LINKS = [
  { label: "Somos confiáveis", href: "#" },
  { label: "Imprensa", href: "#" },
  { label: "Trabalhe conosco", href: "#" },
];

const SERVICE_LINKS = [
  { label: "Abrir empresa", href: "#" },
  { label: "Troca de contador", href: "#" },
  { label: "Migrar de MEI para ME", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-primary py-14 text-primary-foreground">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <Logo className="[&_span]:text-primary-foreground [&_span_span]:text-primary-foreground/70" />
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/85">
            A Infinity é uma contabilidade 100% online. Nosso objetivo é
            trazer mais praticidade, transparência e confiança para micro e
            pequenas empresas.
          </p>
          <div className="mt-5 flex gap-3">
            {[Play, Camera, Briefcase, Share2].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="Rede social"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold">Contato</h3>
          <div className="mt-4 space-y-4 text-sm text-primary-foreground/85">
            <div>
              <p className="font-semibold text-primary-foreground">São Paulo, SP</p>
              <p>Av. Central, 1000 — São Paulo/SP</p>
            </div>
            <div>
              <p className="font-semibold text-primary-foreground">Suporte</p>
              <p>4020-8283 (ligação local)</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold">A empresa</h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            {COMPANY_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-primary-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 font-heading text-sm font-bold">Serviços</h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            {SERVICE_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-primary-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold">Avaliações</h3>
          <div className="mt-4 flex flex-col gap-3">
            <div className="rounded-xl bg-primary-foreground/10 px-4 py-3 text-sm">
              <span className="font-bold">4.8</span> ★★★★★ Google
            </div>
            <div className="rounded-xl bg-primary-foreground/10 px-4 py-3 text-sm">
              Selo de excelência — Reclame Aqui
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[1440px] border-t border-primary-foreground/15 px-6 pt-6 text-xs text-primary-foreground/70 lg:px-10">
        © {new Date().getFullYear()} Infinity Contabilidade — Todos os direitos reservados
      </div>
    </footer>
  );
}
