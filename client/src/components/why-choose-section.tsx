import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Layers, Languages, Zap, Headphones } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface WhyChooseSectionProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "Why Choose Us",
    subtitle: "What makes us the ideal partner for your digital transformation",
    reasons: [
      {
        icon: MapPin,
        title: "Local Qatar Market Understanding",
        desc: "Deep knowledge of Qatar business culture and market dynamics",
      },
      {
        icon: Layers,
        title: "Complete Solution",
        desc: "Both mobile apps and websites under one roof",
      },
      {
        icon: Languages,
        title: "Arabic/English Expertise",
        desc: "Seamless bilingual experiences for your customers",
      },
      {
        icon: Zap,
        title: "Quick Turnaround",
        desc: "Efficient processes to get your project live faster",
      },
      {
        icon: Headphones,
        title: "Ongoing Support",
        desc: "Dedicated support team for maintenance and updates",
      },
    ],
  },
  ar: {
    title: "لماذا تختارنا",
    subtitle: "ما الذي يجعلنا الشريك المثالي لتحولك الرقمي",
    reasons: [
      {
        icon: MapPin,
        title: "فهم السوق القطري المحلي",
        desc: "معرفة عميقة بثقافة الأعمال القطرية وديناميكيات السوق",
      },
      {
        icon: Layers,
        title: "حل كامل",
        desc: "تطبيقات الجوال والمواقع الإلكترونية تحت سقف واحد",
      },
      {
        icon: Languages,
        title: "خبرة العربية / الإنجليزية",
        desc: "تجارب ثنائية اللغة سلسة لعملائك",
      },
      {
        icon: Zap,
        title: "تسليم سريع",
        desc: "عمليات فعالة لإطلاق مشروعك بشكل أسرع",
      },
      {
        icon: Headphones,
        title: "دعم مستمر",
        desc: "فريق دعم متخصص للصيانة والتحديثات",
      },
    ],
  },
};

export function WhyChooseSection({ language }: WhyChooseSectionProps) {
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="why-us" className="relative py-20 md:py-24 bg-gradient-to-b from-background to-muted/20 overflow-hidden" ref={ref}>
      {/* Decorative diagonal overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rotate-12 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 -rotate-12 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, y: 0 } : {})}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-primary mb-4" data-testid="text-why-choose-title">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-why-choose-subtitle">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : (isInView ? "visible" : "hidden")}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {t.reasons.map((reason, index) => (
            <motion.div key={index} variants={staggerItem}>
              <div style={{ perspective: prefersReducedMotion ? "none" : "1000px" }}>
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05, rotateX: -5 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: prefersReducedMotion ? "flat" : "preserve-3d" }}
                >
                  <Card
                    className="hover-elevate transition-all duration-300 h-full group border-l-4 border-l-primary/30"
                    data-testid={`card-reason-${index}`}
                  >
                    <CardHeader className="pb-4">
                      {/* Numbered badge */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent text-background flex items-center justify-center font-bold text-sm shadow-md">
                        {index + 1}
                      </div>
                      <motion.div
                        className="mb-4"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center shadow-lg group-hover:shadow-primary/20">
                          <reason.icon className="h-7 w-7 text-primary" />
                        </div>
                      </motion.div>
                      <CardTitle className="text-xl font-semibold" data-testid={`text-reason-title-${index}`}>{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-reason-desc-${index}`}>{reason.desc}</p>
                </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
