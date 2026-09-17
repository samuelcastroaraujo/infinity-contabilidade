import { Camera } from "lucide-react";
import { Logo } from "./Logo";
import { InfinityMark } from "./InfinityMark";
import { Container } from "@/components/ui/container";

const SERVICE_LINKS = [
  { label: "Folha de Pagamento e Departamento Pessoal", href: "/#servicos" },
  { label: "Assessoria Contábil e Fiscal", href: "/#servicos" },
  { label: "Serviços Trabalhistas e Financeiros", href: "/#servicos" },
  { label: "Emissão de Nota Fiscal Eletrônica (NFe)", href: "/#servicos" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-700 py-14 text-white">
      <InfinityMark className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 text-white/[0.04]" />

      <Container className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-white/85">
            Soluções contábeis, fiscais e financeiras para empresas de todos
            os portes. Atendimento presencial em Anápolis/GO e 100% digital
            em todo o território nacional, desde 2014.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/infinitycontabilidadesolucoes/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Instagram"
            >
              <Camera className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold">Contato</h3>
          <div className="mt-4 space-y-3 text-sm text-white/85">
            <p>
              Rua Geralda Alves da Costa, Quadra F, Lote 18, Sala 02
              <br />
              Vila Santa Isabel — Anápolis/GO
            </p>
            <p>
              <a href="https://wa.me/5562991053454" className="hover:text-white">
                WhatsApp: (62) 99105-3454
              </a>
            </p>
            <p>
              <a href="https://wa.me/5562993218485" className="hover:text-white">
                WhatsApp: (62) 99321-8485
              </a>
            </p>
            <p>
              <a href="tel:+556233146896" className="hover:text-white">
                Telefone fixo: (62) 3314-6896
              </a>
            </p>
            <p>
              <a href="mailto:infinitycontabilidade20@gmail.com" className="hover:text-white">
                infinitycontabilidade20@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold">Serviços</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            {SERVICE_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="relative mt-10 border-t border-white/15 pt-6 text-xs text-white/70">
        Infinity Contabilidade — CNPJ 38.488.614/0001-37 — © {new Date().getFullYear()} Todos os direitos reservados
      </Container>
    </footer>
  );
}
