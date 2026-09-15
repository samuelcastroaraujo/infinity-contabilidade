import { Button } from "@/components/ui/button";

export function CtaBannerSection() {
  return (
    <section className="bg-muted py-20 text-center">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Descomplique. Cresça. Infinity.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Porque sua contabilidade merece estar em boas mãos.
        </p>
        <Button
          size="lg"
          className="mt-8 h-12 rounded-full bg-accent px-8 text-base font-bold text-accent-foreground hover:bg-accent/90"
        >
          Contrate a Infinity
        </Button>
      </div>
    </section>
  );
}
