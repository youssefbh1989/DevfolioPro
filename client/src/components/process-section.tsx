import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Palette, Code2, TestTube, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ProcessSectionProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "Our Process",
    subtitle: "A proven 5-step workflow for successful projects",
    steps: [
      {
        icon: Lightbulb,
        title: "Discovery & Planning",
        desc: "Understanding your business goals and requirements",
      },
      {
        icon: Palette,
        title: "Design & Prototyping",
        desc: "Creating beautiful, user-friendly interfaces",
      },
      {
        icon: Code2,
        title: "Development",
        desc: "Building with latest technologies and best practices",
      },
      {
        icon: TestTube,
        title: "Testing & QA",
        desc: "Rigorous testing to ensure quality and performance",
      },
      {
        icon: Rocket,
        title: "Launch & Support",
        desc: "Deploying and providing ongoing maintenance",
      },
    ],
  },
  ar: {
    title: "عمليتنا",
    subtitle: "سير عمل مجرب من 5 خطوات لمشاريع ناجحة",
    steps: [
      {
        icon: Lightbulb,
        title: "الاكتشاف والتخطيط",
        desc: "فهم أهداف عملك ومتطلباتك",
      },
      {
        icon: Palette,
        title: "التصميم والنماذج",
        desc: "إنشاء واجهات جميلة وسهلة الاستخدام",
      },
      {
        icon: Code2,
        title: "التطوير",
        desc: "البناء بأحدث التقنيات وأفضل الممارسات",
      },
      {
        icon: TestTube,
        title: "الاختبار وضمان الجودة",
        desc: "اختبار صارم لضمان الجودة والأداء",
      },
      {
        icon: Rocket,
        title: "الإطلاق والدعم",
        desc: "النشر وتوفير الصيانة المستمرة",
      },
    ],
  },
};

export function ProcessSection({ language }: ProcessSectionProps) {
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="process" className="relative py-20 md:py-24 bg-gradient-to-br from-muted to-muted/50 overflow-hidden" ref={ref}>
      {/* Diagonal decorative elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rotate-45 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/5 -rotate-12 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-primary mb-4" data-testid="text-process-title">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-process-subtitle">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-5 gap-6 md:gap-4 max-w-6xl mx-auto"
        >
          {t.steps.map((step, index) => (
            <motion.div key={index} variants={staggerItem} className="relative" data-testid={`step-${index}`}>
              <div style={{ perspective: prefersReducedMotion ? "none" : "1000px" }}>
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: prefersReducedMotion ? "flat" : "preserve-3d" }}
                >
                  <Card className="hover-elevate transition-all duration-300 h-full group border-t-4 border-t-primary/50">
                    <CardContent className="p-6 text-center flex flex-col items-center">
                      <motion.div
                        className="mb-4 relative"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                          <step.icon className="h-8 w-8 text-background" />
                        </div>
                        <motion.div
                          initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                          animate={prefersReducedMotion ? {} : (isInView ? { scale: 1 } : {})}
                          transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shadow-md"
                        >
                          {index + 1}
                        </motion.div>
                      </motion.div>
                  <h3 className="font-serif font-semibold text-lg mb-2 text-foreground" data-testid={`text-step-title-${index}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-step-desc-${index}`}>
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
                </motion.div>
              </div>
              {index < t.steps.length - 1 && (
                <motion.div
                  initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={prefersReducedMotion ? {} : (isInView ? { scaleX: 1 } : {})}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 w-4 h-0.5 bg-primary/30 origin-left"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
