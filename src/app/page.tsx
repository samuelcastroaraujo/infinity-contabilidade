import { Header } from "@/components/sites/agilize-com-br-d8fa62a2/shared/Header";
import { Footer } from "@/components/sites/agilize-com-br-d8fa62a2/shared/Footer";
import { HeroSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/HeroSection";
import { ChannelsSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/ChannelsSection";
import { AboutSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/AboutSection";
import { ServicesSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/ServicesSection";
import { SegmentsSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/SegmentsSection";
import { FaqSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/FaqSection";
import { ContactSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ChannelsSection />
        <AboutSection />
        <ServicesSection />
        <SegmentsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
