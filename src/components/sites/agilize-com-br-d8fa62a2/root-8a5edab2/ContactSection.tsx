import { MapPin, Phone, Mail, Camera } from "lucide-react";
import { ContactForm } from "./ContactForm";

const PHONES = [
  { label: "WhatsApp", value: "(62) 99105-3454", href: "https://wa.me/5562991053454" },
  { label: "WhatsApp", value: "(62) 99321-8485", href: "https://wa.me/5562993218485" },
  { label: "Telefone fixo", value: "(62) 3314-6896", href: "tel:+556233146896" },
];

export function ContactSection() {
  return (
    <section id="contato" className="py-20 scroll-mt-24">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-10 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
            Contato & Localização
          </h2>
          <p className="mt-4 text-muted-foreground">
            Fale com a gente por WhatsApp, telefone, e-mail ou venha até o
            nosso escritório em Anápolis.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm text-foreground/85">
                Rua Geralda Alves da Costa, Quadra F, Lote 18, Sala 02
                <br />
                Vila Santa Isabel — Anápolis/GO
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="space-y-1 text-sm text-foreground/85">
                {PHONES.map((p) => (
                  <p key={p.value}>
                    <a href={p.href} className="hover:text-primary" target="_blank" rel="noopener noreferrer">
                      {p.label}: {p.value}
                    </a>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
              <a
                href="mailto:infinitycontabilidade20@gmail.com"
                className="text-sm text-foreground/85 hover:text-primary"
              >
                infinitycontabilidade20@gmail.com
              </a>
            </div>

            <div className="flex items-start gap-3">
              <Camera className="mt-0.5 size-5 shrink-0 text-primary" />
              <a
                href="https://www.instagram.com/infinitycontabilidadesolucoes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/85 hover:text-primary"
              >
                Siga a gente no Instagram
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
