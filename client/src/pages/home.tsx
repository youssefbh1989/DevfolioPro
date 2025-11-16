import { useState, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ProcessSection } from "@/components/process-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);
  
  return (
    <div className={language === "ar" ? "rtl" : ""}>
      <Navigation language={language} onLanguageChange={setLanguage} />
      <main>
        <HeroSection language={language} />
        <ServicesSection language={language} />
        <PortfolioSection language={language} />
        <ProcessSection language={language} />
        <WhyChooseSection language={language} />
        <TestimonialsSection language={language} />
        <ContactSection language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}
