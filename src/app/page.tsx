import { Header } from "@/components/sites/agilize-com-br-d8fa62a2/shared/Header";
import { Footer } from "@/components/sites/agilize-com-br-d8fa62a2/shared/Footer";
import { HeroSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/HeroSection";
import { FeatureHighlightsSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/FeatureHighlightsSection";
import { SegmentsSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/SegmentsSection";
import { BenefitsCardsSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/BenefitsCardsSection";
import { ProcessSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/ProcessSection";
import { TrustSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/TrustSection";
import { CtaBannerSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/CtaBannerSection";
import { NationwideSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/NationwideSection";
import { PricingSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/PricingSection";
import { DashboardFeaturesSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/DashboardFeaturesSection";
import { TeamSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/TeamSection";
import { TestimonialsSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/TestimonialsSection";
import { PressLogosSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/PressLogosSection";
import { LeadFormSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/LeadFormSection";
import { FaqSection } from "@/components/sites/agilize-com-br-d8fa62a2/root-8a5edab2/FaqSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeatureHighlightsSection />
        <SegmentsSection />
        <BenefitsCardsSection />
        <ProcessSection />
        <TrustSection />
        <CtaBannerSection />
        <NationwideSection />
        <PricingSection />
        <DashboardFeaturesSection />
        <TeamSection />
        <TestimonialsSection />
        <PressLogosSection />
        <LeadFormSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
