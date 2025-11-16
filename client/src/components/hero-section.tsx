import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/Qatar_office_tech_collaboration_4ec9cba7.png";
import { fadeInUp, fadeIn, magneticHover, glowPulse, morphIn } from "@/lib/animations";

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
        variants={fadeIn}
        initial="hidden"
        animate="visible"
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
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-primary/75"
        />
      </motion.div>

      {/* Animated content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 text-center" style={{ perspective: "1000px" }}>
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight max-w-5xl mx-auto"
          data-testid="text-hero-headline"
        >
          {t.headline}
        </motion.h1>
        
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl text-white/95 mb-12 max-w-3xl mx-auto font-medium"
          data-testid="text-hero-subheading"
        >
          {t.subheading}
        </motion.p>
        
        <motion.div
          variants={morphIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            variants={magneticHover}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
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
          
          <motion.div
            variants={magneticHover}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
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

      {/* Floating decorative elements with glow pulse */}
      <motion.div
        variants={glowPulse}
        initial="initial"
        animate="animate"
        className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-accent/25 blur-3xl hidden lg:block"
      />
      
      <motion.div
        variants={glowPulse}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
        className="absolute top-40 right-10 w-32 h-32 rounded-full bg-accent/20 blur-3xl hidden lg:block"
      />
      
      <motion.div
        variants={glowPulse}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute bottom-1/3 right-1/4 w-28 h-28 rounded-full bg-primary/15 blur-3xl hidden lg:block"
      />
    </section>
  );
}
