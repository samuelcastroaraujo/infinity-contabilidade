import { Button } from "@/components/ui/button";

export function TeamSection() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-t-full bg-primary-foreground/10"
              />
            ))}
          </div>

          <div>
            <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
              Por trás de cada solução, existe uma equipe comprometida com o
              seu sucesso.
            </h2>
            <p className="mt-5 text-primary-foreground/90">
              Seja atendido por especialistas em contabilidade que ajudam a{" "}
              <strong className="font-bold">simplificar o seu dia a dia</strong>.
              Nosso time transforma processos burocráticos em soluções
              práticas, eliminando obstáculos e criando caminhos mais simples
              para o sucesso do seu negócio.
            </p>
            <Button
              size="lg"
              className="mt-7 h-12 rounded-full bg-accent px-6 text-base font-bold text-accent-foreground hover:bg-accent/90"
            >
              Fale com especialistas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
