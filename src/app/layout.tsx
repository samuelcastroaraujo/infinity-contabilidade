import type { Metadata } from "next";
import { Inter, Baloo_2, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const baloo2 = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infinity Contabilidade | Contabilidade em Anápolis e Goiás",
  description:
    "Contabilidade em Anápolis/GO desde 2014. Folha de pagamento, assessoria contábil e fiscal, serviços trabalhistas e emissão de NFe. Atendimento presencial em Anápolis e 100% digital em todo o estado de Goiás.",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Infinity Contabilidade",
  taxID: "38.488.614/0001-37",
  foundingDate: "2014",
  email: "infinitycontabilidade20@gmail.com",
  telephone: "+55 62 3314-6896",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Geralda Alves da Costa, Quadra F, Lote 18, Sala 02, Vila Santa Isabel",
    addressLocality: "Anápolis",
    addressRegion: "GO",
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "City", name: "Anápolis" },
    { "@type": "State", name: "Goiás" },
  ],
  sameAs: ["https://www.instagram.com/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${baloo2.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
