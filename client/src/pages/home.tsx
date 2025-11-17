import { useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ProcessSection } from "@/components/process-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);
  
  return (
    <div className={language === "ar" ? "rtl" : ""}>
      <Navigation />
      <main>
        <HeroSection language={language} />
        <ServicesSection language={language} />
        <StatsSection language={language} />
        <PortfolioSection language={language} />
        <ProcessSection language={language} />
        <WhyChooseSection language={language} />
        <TestimonialsSection language={language} />
        <ContactSection language={language} />
      </main>
      <Footer />
    </div>
  );
}
