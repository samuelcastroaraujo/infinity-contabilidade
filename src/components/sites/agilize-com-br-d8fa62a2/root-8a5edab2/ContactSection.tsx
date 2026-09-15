import { MapPin, Phone, Mail, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/85 hover:text-primary"
              >
                Siga a gente no Instagram
              </a>
            </div>
          </div>
        </div>

        <form className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground">
          <div className="relative z-10 grid grid-cols-1 gap-4">
            <label className="flex flex-col gap-1.5 text-sm">
              Nome
              <input
                className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
                placeholder="Digite seu nome completo"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              E-mail
              <input
                type="email"
                className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
                placeholder="exemplo@gmail.com"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Assunto
              <input
                className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
                placeholder="Sobre o que você quer falar?"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Mensagem
              <textarea
                rows={4}
                className="rounded-lg border border-primary-foreground/20 bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground"
                placeholder="Escreva sua mensagem"
              />
            </label>
          </div>

          <Button className="relative z-10 mt-6 h-11 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
            Enviar mensagem
          </Button>

          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary-foreground/10" />
          <div className="absolute -bottom-16 -left-10 size-48 rounded-full bg-primary-foreground/10" />
        </form>
      </div>
    </section>
  );
}
