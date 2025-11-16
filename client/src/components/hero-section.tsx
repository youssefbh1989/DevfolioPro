import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Qatar_office_tech_collaboration_4ec9cba7.png";

interface HeroSectionProps {
  language: "en" | "ar";
}

const content = {
  en: {
    headline: "We Build Mobile Apps & Websites for Qatari Businesses",
    subheading: "Complete digital solutions from idea to launch",
    cta1: "View Our Work",
    cta2: "Get Free Consultation",
  },
  ar: {
    headline: "نبني تطبيقات الجوال والمواقع الإلكترونية للشركات القطرية",
    subheading: "حلول رقمية كاملة من الفكرة إلى الإطلاق",
    cta1: "اعرض أعمالنا",
    cta2: "احصل على استشارة مجانية",
  },
};

export function HeroSection({ language }: HeroSectionProps) {
  const t = content[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-primary/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        <h1 className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight max-w-5xl mx-auto" data-testid="text-hero-headline">
          {t.headline}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-12 max-w-3xl mx-auto font-medium" data-testid="text-hero-subheading">
          {t.subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("portfolio")}
            className="bg-white/95 text-primary hover:bg-white border-2 border-white/20 backdrop-blur-sm min-w-[200px] text-base font-semibold shadow-lg"
            data-testid="button-hero-view-work"
          >
            {t.cta1}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="bg-accent/95 text-accent-foreground hover:bg-accent border-2 border-accent backdrop-blur-sm min-w-[200px] text-base font-semibold shadow-lg"
            data-testid="button-hero-consultation"
          >
            {t.cta2}
          </Button>
        </div>
      </div>
    </section>
  );
}
