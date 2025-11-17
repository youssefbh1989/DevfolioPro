import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Testimonial } from "@shared/schema";

interface TestimonialsSectionProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "What Our Clients Say",
    subtitle: "Success stories from businesses across Qatar",
  },
  ar: {
    title: "ماذا يقول عملاؤنا",
    subtitle: "قصص نجاح من شركات في جميع أنحاء قطر",
  },
};

export function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const t = content[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  useEffect(() => {
    if (testimonials.length === 0 || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length, prefersReducedMotion]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`;
    }
    return name.substring(0, 2);
  };

  const renderStars = (rating: string) => {
    const stars = parseInt(rating);
    return (
      <div className="flex gap-1" data-testid="rating-stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < stars ? "fill-accent text-accent" : "text-muted-foreground"
            }`}
            data-testid={`star-${i + 1}`}
          />
        ))}
      </div>
    );
  };

  if (isLoading || testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20 md:py-24 bg-muted/30 min-h-[500px]" ref={ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-4" data-testid="text-testimonials-title">
              {t.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-testimonials-subtitle">
              {t.subtitle}
            </p>
          </div>
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-20 md:py-24 bg-gradient-to-b from-muted/30 to-background min-h-[500px] overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rotate-12 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-primary mb-4" data-testid="text-testimonials-title">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-testimonials-subtitle">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" style={{ perspective: prefersReducedMotion ? "none" : "1000px" }}>
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02, rotateX: -2 }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: prefersReducedMotion ? "flat" : "preserve-3d" }}
          >
            <Card className="relative overflow-visible border-l-4 border-l-primary/30 shadow-xl shadow-primary/10" data-testid="card-testimonial">
              <CardContent className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Quote className="absolute top-8 left-8 h-12 w-12 text-accent/30" />
                </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  {renderStars(currentTestimonial.rating)}

                  <blockquote className="mt-6 text-lg md:text-xl text-foreground leading-relaxed" data-testid="text-testimonial-content">
                    "{language === "ar" ? currentTestimonial.testimonialAr : currentTestimonial.testimonial}"
                  </blockquote>

                  <div className="flex items-center gap-4 mt-8">
                  <Avatar className="h-14 w-14" data-testid="avatar-testimonial">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                      {getInitials(language === "ar" ? currentTestimonial.clientNameAr : currentTestimonial.clientName)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-semibold text-lg text-foreground" data-testid="text-client-name">
                      {language === "ar" ? currentTestimonial.clientNameAr : currentTestimonial.clientName}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid="text-client-position">
                      {language === "ar" ? currentTestimonial.clientPositionAr : currentTestimonial.clientPosition}
                      {" • "}
                      {language === "ar" ? currentTestimonial.clientCompanyAr : currentTestimonial.clientCompany}
                    </p>
                  </div>
                </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
            </Card>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full hover:bg-primary/10 hover:border-primary border-2"
              data-testid="button-previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2" data-testid="pagination-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-primary to-accent"
                      : "w-2 bg-muted-foreground/30 hover:bg-primary/50"
                  }`}
                  data-testid={`dot-${index}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full hover:bg-primary/10 hover:border-primary border-2"
              data-testid="button-next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
