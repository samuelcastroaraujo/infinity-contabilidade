import { Header } from "@/components/sites/infinity-contabilidade/shared/Header";
import { Footer } from "@/components/sites/infinity-contabilidade/shared/Footer";
import { HeroSection } from "@/components/sites/infinity-contabilidade/root-8a5edab2/HeroSection";
import { ChannelsSection } from "@/components/sites/infinity-contabilidade/root-8a5edab2/ChannelsSection";
import { AboutSection } from "@/components/sites/infinity-contabilidade/root-8a5edab2/AboutSection";
import { ServicesSection } from "@/components/sites/infinity-contabilidade/root-8a5edab2/ServicesSection";
import { ProcessSection } from "@/components/sites/infinity-contabilidade/root-8a5edab2/ProcessSection";
import { SegmentsSection } from "@/components/sites/infinity-contabilidade/root-8a5edab2/SegmentsSection";
import { FaqSection } from "@/components/sites/infinity-contabilidade/root-8a5edab2/FaqSection";
import { ContactSection } from "@/components/sites/infinity-contabilidade/root-8a5edab2/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ChannelsSection />
        <ServicesSection />
        <ProcessSection />
        <SegmentsSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
