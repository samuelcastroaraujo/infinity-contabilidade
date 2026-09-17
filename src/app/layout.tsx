import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";

const PAGE_TITLE = "Infinity Contabilidade | Contabilidade em Anápolis e Goiás";
const PAGE_DESCRIPTION =
  "Contabilidade em Anápolis/GO desde 2014. Folha de pagamento, assessoria contábil e fiscal, serviços trabalhistas e emissão de NFe. Atendimento presencial em Anápolis e 100% digital em todo o território nacional.";
const OG_LOGO = "/sites/agilize-com-br-d8fa62a2/shared/logo-infinity.png";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [{ url: OG_LOGO, width: 607, height: 411, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_LOGO],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": `${SITE_URL}/#organization`,
  url: SITE_URL,
  name: "Infinity Contabilidade",
  image: `${SITE_URL}${OG_LOGO}`,
  logo: `${SITE_URL}${OG_LOGO}`,
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
    // CEP não publicado em nenhum lugar do site hoje — adicionar quando o
    // cliente confirmar (endereço fica tecnicamente incompleto sem ele).
  },
  areaServed: [
    { "@type": "City", name: "Anápolis" },
    { "@type": "State", name: "Goiás" },
    { "@type": "Country", name: "Brasil" },
  ],
  sameAs: ["https://www.instagram.com/infinitycontabilidadesolucoes/"],
  // geo (lat/long) e openingHoursSpecification propositalmente omitidos:
  // nenhuma coordenada nem horário de funcionamento existe hoje em lugar
  // nenhum do site — não inventar, adicionar quando o cliente informar.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
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
