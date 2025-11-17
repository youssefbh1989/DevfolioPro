import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { TrendingUp, Users, Award, Zap } from "lucide-react";

interface StatsSectionProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "Our Track Record",
    subtitle: "Numbers that speak for themselves",
    stats: [
      { value: 50, label: "Projects Completed", suffix: "+", icon: Award },
      { value: 100, label: "Happy Clients", suffix: "+", icon: Users },
      { value: 5, label: "Years Experience", suffix: "+", icon: TrendingUp },
      { value: 98, label: "Success Rate", suffix: "%", icon: Zap },
    ],
  },
  ar: {
    title: "سجل إنجازاتنا",
    subtitle: "أرقام تتحدث عن نفسها",
    stats: [
      { value: 50, label: "مشروع مكتمل", suffix: "+", icon: Award },
      { value: 100, label: "عميل سعيد", suffix: "+", icon: Users },
      { value: 5, label: "سنوات الخبرة", suffix: "+", icon: TrendingUp },
      { value: 98, label: "معدل النجاح", suffix: "%", icon: Zap },
    ],
  },
};

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      const duration = prefersReducedMotion ? 0 : 2;
      const controls = animate(motionValue, value, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, value, motionValue, prefersReducedMotion]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsSection({ language }: StatsSectionProps) {
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
      
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-4" data-testid="text-stats-title">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-stats-subtitle">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {t.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
                data-testid={`stat-${index}`}
              >
                <motion.div
                  className="relative inline-block mb-4"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotateY: 10 }}
                  transition={{ duration: 0.3 }}
                  style={{ perspective: "1000px" }}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <Icon className="h-10 w-10 md:h-12 md:w-12 text-white" />
                  </div>
                  
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>

                <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid={`text-stat-value-${index}`}>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-base md:text-lg text-muted-foreground font-medium" data-testid={`text-stat-label-${index}`}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
