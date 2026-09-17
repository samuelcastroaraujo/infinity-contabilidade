import { MapPin, Phone, Mail, Camera } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const PHONES = [
  { label: "WhatsApp", value: "(62) 99105-3454", href: "https://wa.me/5562991053454" },
  { label: "WhatsApp", value: "(62) 99321-8485", href: "https://wa.me/5562993218485" },
  { label: "Telefone fixo", value: "(62) 3314-6896", href: "tel:+556233146896" },
];

export function ContactSection() {
  return (
    <Section id="contato" tone="subtle" className="scroll-mt-24">
      <Container className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-h2 font-extrabold text-primary-700">
            Contato & Localização
          </h2>
          <p className="mt-4 text-neutral-500">
            Fale com a gente por WhatsApp, telefone, e-mail ou venha até o
            nosso escritório em Anápolis.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary-500" />
              <p className="text-sm text-neutral-700">
                Rua Geralda Alves da Costa, Quadra F, Lote 18, Sala 02
                <br />
                Vila Santa Isabel — Anápolis/GO
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary-500" />
              <div className="space-y-1 text-sm text-neutral-700">
                {PHONES.map((p) => (
                  <p key={p.value}>
                    <a href={p.href} className="hover:text-primary-600" target="_blank" rel="noopener noreferrer">
                      {p.label}: {p.value}
                    </a>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary-500" />
              <a
                href="mailto:infinitycontabilidade20@gmail.com"
                className="text-sm text-neutral-700 hover:text-primary-600"
              >
                infinitycontabilidade20@gmail.com
              </a>
            </div>

            <div className="flex items-start gap-3">
              <Camera className="mt-0.5 size-5 shrink-0 text-primary-500" />
              <a
                href="https://www.instagram.com/infinitycontabilidadesolucoes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-700 hover:text-primary-600"
              >
                Siga a gente no Instagram
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </Container>
    </Section>
  );
}
