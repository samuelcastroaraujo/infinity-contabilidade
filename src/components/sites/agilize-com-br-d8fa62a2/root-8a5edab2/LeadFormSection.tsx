import { Button } from "@/components/ui/button";

export function LeadFormSection() {
  return (
    <section id="contato" className="py-20 scroll-mt-24">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
            Estamos quase lá!
          </h2>
          <p className="mt-4 text-muted-foreground">
            Preencha o formulário e{" "}
            <strong className="font-bold text-foreground">
              em até 5 minutos
            </strong>{" "}
            entraremos em contato com você.
          </p>
          <p className="mt-3 text-muted-foreground">
            Descubra como pagar menos impostos e manter sua empresa
            regularizada.
          </p>
          <div className="mt-8 aspect-[4/3] max-w-sm overflow-hidden rounded-[2.5rem] bg-secondary" />
        </div>

        <form className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground">
          <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              Nome
              <input
                className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
                placeholder="Digite seu nome completo"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              E-mail
              <input
                className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
                placeholder="exemplo@gmail.com"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Telefone
              <input
                className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
                placeholder="(DD) 90000-0000"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Estado
              <input
                className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
                placeholder="Ex.: São Paulo"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Cidade
              <input
                className="h-11 rounded-lg border border-primary-foreground/20 bg-background px-3 text-foreground placeholder:text-muted-foreground"
                placeholder="Ex.: Petrópolis"
              />
            </label>
          </div>

          <Button className="relative z-10 mt-6 h-11 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
            Falar com especialista
          </Button>
          <p className="relative z-10 mt-3 text-xs text-primary-foreground/70">
            Ao solicitar uma proposta, você concorda com nossos Termos de Uso
            e Política de Privacidade.
          </p>

          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary-foreground/10" />
          <div className="absolute -bottom-16 -left-10 size-48 rounded-full bg-primary-foreground/10" />
        </form>
      </div>
    </section>
  );
}
