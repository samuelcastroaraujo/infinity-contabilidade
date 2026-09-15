const OUTLETS = [
  "Portal Negócios",
  "UOL",
  "Você S/A",
  "Terra",
  "O Globo",
  "Estadão",
  "PME & Negócios",
  "Correio",
  "Exame",
  "Gazeta do Povo",
];

export function PressLogosSection() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-xl font-extrabold text-foreground sm:text-2xl">
          Principais veículos que estão falando da Infinity:
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 grayscale">
          {OUTLETS.map((name) => (
            <span key={name} className="font-heading text-lg font-bold text-foreground">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
