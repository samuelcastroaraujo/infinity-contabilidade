import { Eye, Landmark, PiggyBank, ReceiptText, LayoutGrid, Bell } from "lucide-react";

const FEATURES = [
  { icon: Eye, title: "Transparência fiscal", description: "Entenda cada imposto com base no CNAE e no faturamento da empresa.", pos: "top-left" },
  { icon: Landmark, title: "Conciliação bancária", description: "Categorize suas transações e facilite sua organização e declaração do IR.", pos: "top-right" },
  { icon: PiggyBank, title: "Previsão de impostos", description: "Saiba com antecedência quanto vai pagar para se planejar melhor.", pos: "mid-left" },
  { icon: ReceiptText, title: "Notas fiscais", description: "Emita, importe e cancele notas fiscais de maneira mais prática.", pos: "mid-right" },
  { icon: LayoutGrid, title: "Gestão completa", description: "Controle financeiro, contábil e de RH em um só lugar.", pos: "bottom-left" },
  { icon: Bell, title: "Notificações", description: "Receba alertas para não perder prazos e manter tudo em dia.", pos: "bottom-right" },
];

export function DashboardFeaturesSection() {
  return (
    <section id="recursos" className="bg-muted py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-10">
        <h2 className="text-center font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          Gerencie sua empresa em um só lugar
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {FEATURES.slice(0, 4).map((f) => (
            <div key={f.title} className="flex items-start gap-4 rounded-2xl bg-background p-6 shadow-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <f.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
          <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-2.5">
            <span className="text-xs font-bold text-secondary-foreground">Painel de controle</span>
          </div>
          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-16 rounded-lg bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-16 rounded-lg bg-muted" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {FEATURES.slice(4).map((f) => (
            <div key={f.title} className="flex items-start gap-4 rounded-2xl bg-background p-6 shadow-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <f.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
