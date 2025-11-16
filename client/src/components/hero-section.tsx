import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
      {/* Animated background with gradient overlay */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-primary/75"
        />
      </motion.div>

      {/* Animated content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight max-w-5xl mx-auto"
          data-testid="text-hero-headline"
        >
          {t.headline}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl lg:text-2xl text-white/95 mb-12 max-w-3xl mx-auto font-medium"
          data-testid="text-hero-subheading"
        >
          {t.subheading}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              onClick={() => scrollToSection("portfolio")}
              className="bg-white/95 text-primary hover:bg-white border-2 border-white/20 backdrop-blur-sm min-w-[200px] text-base font-semibold shadow-lg"
              data-testid="button-hero-view-work"
            >
              {t.cta1}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="bg-accent/95 text-accent-foreground hover:bg-accent border-2 border-accent backdrop-blur-sm min-w-[200px] text-base font-semibold shadow-lg"
              data-testid="button-hero-consultation"
            >
              {t.cta2}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-10 w-20 h-20 rounded-full bg-accent/20 blur-2xl hidden lg:block"
      />
      
      <motion.div
        animate={{
          y: [20, -20, 20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-40 right-10 w-32 h-32 rounded-full bg-accent/15 blur-3xl hidden lg:block"
      />
    </section>
  );
}
