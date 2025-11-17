import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Globe, ShoppingCart, TrendingUp, Layout, Code, Wrench, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";
import { staggerContainer, staggerItem, cardHover, numberCounter } from "@/lib/animations";

interface ServicesSectionProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "Our Services",
    subtitle: "Comprehensive digital solutions tailored for your business",
    mobileApps: {
      title: "Mobile App Development",
      services: [
        { icon: Smartphone, name: "Custom iOS & Android Apps", desc: "Native apps built for performance" },
        { icon: ShoppingCart, name: "E-commerce Mobile Apps", desc: "Seamless shopping experiences" },
        { icon: Code, name: "Business Utility Apps", desc: "Streamline your operations" },
        { icon: TrendingUp, name: "App Store Optimization", desc: "Maximize your app visibility" },
      ],
    },
    websites: {
      title: "Website Development",
      services: [
        { icon: Layout, name: "Responsive Business Websites", desc: "Professional online presence" },
        { icon: ShoppingCart, name: "E-commerce Websites", desc: "Powerful online stores" },
        { icon: Globe, name: "WordPress Development", desc: "Easy-to-manage websites" },
        { icon: Wrench, name: "Website Maintenance", desc: "Ongoing support & updates" },
      ],
    },
  },
  ar: {
    title: "خدماتنا",
    subtitle: "حلول رقمية شاملة مصممة خصيصاً لعملك",
    mobileApps: {
      title: "تطوير تطبيقات الجوال",
      services: [
        { icon: Smartphone, name: "تطبيقات iOS و Android مخصصة", desc: "تطبيقات أصلية مبنية للأداء" },
        { icon: ShoppingCart, name: "تطبيقات التجارة الإلكترونية", desc: "تجارب تسوق سلسة" },
        { icon: Code, name: "تطبيقات الأعمال", desc: "تبسيط عملياتك" },
        { icon: TrendingUp, name: "تحسين متجر التطبيقات", desc: "زيادة ظهور تطبيقك" },
      ],
    },
    websites: {
      title: "تطوير المواقع الإلكترونية",
      services: [
        { icon: Layout, name: "مواقع الأعمال المتجاوبة", desc: "حضور احترافي على الإنترنت" },
        { icon: ShoppingCart, name: "مواقع التجارة الإلكترونية", desc: "متاجر إلكترونية قوية" },
        { icon: Globe, name: "تطوير WordPress", desc: "مواقع سهلة الإدارة" },
        { icon: Wrench, name: "صيانة المواقع", desc: "دعم وتحديثات مستمرة" },
      ],
    },
  },
};

export function ServicesSection({ language }: ServicesSectionProps) {
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const mobileServices = services?.filter(s => s.category === "mobile") || [];
  const websiteServices = services?.filter(s => s.category === "website") || [];

  return (
    <section id="services" className="py-20 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-4" data-testid="text-services-title">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-subtitle">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.h3
              variants={staggerItem}
              className="font-serif font-semibold text-2xl md:text-3xl text-primary mb-8"
              data-testid="text-mobile-apps-heading"
            >
              {t.mobileApps.title}
            </motion.h3>
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
                </div>
              ) : mobileServices.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No mobile app services available
                  </CardContent>
                </Card>
              ) : (
                mobileServices.map((service, index) => (
                  <div 
                    key={service.id}
                    style={{ perspective: "1000px" }}
                  >
                    <motion.div
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Card 
                        className="relative hover-elevate transition-all duration-300 group border-l-4 border-l-primary/40 overflow-visible" 
                        data-testid={`card-mobile-service-${index}`}
                      >
                      <motion.div
                        variants={numberCounter}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: index * 0.1 }}
                        className="absolute top-1 right-1 text-3xl sm:text-4xl md:text-6xl font-bold text-primary/5 leading-none"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.div>
                      <CardHeader className="pb-3 relative z-10">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-3 shrink-0 shadow-sm"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <Smartphone className="h-6 w-6 text-primary" />
                          </motion.div>
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold mb-1 flex items-baseline gap-2" data-testid={`text-mobile-service-name-${index}`}>
                              <span>{language === "ar" ? service.nameAr : service.name}</span>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mb-2 leading-relaxed" data-testid={`text-mobile-service-desc-${index}`}>
                              {language === "ar" ? service.descriptionAr : service.description}
                            </p>
                            <p className="text-base font-bold text-accent mb-3">
                              {language === "ar" ? service.priceAr : service.price}
                            </p>
                            <ul className="mt-3 space-y-1.5">
                              {(language === "ar" ? service.featuresAr : service.features).slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardHeader>
                      </Card>
                    </motion.div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.h3
              variants={staggerItem}
              className="font-serif font-semibold text-2xl md:text-3xl text-primary mb-8"
              data-testid="text-websites-heading"
            >
              {t.websites.title}
            </motion.h3>
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
                </div>
              ) : websiteServices.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No website services available
                  </CardContent>
                </Card>
              ) : (
                websiteServices.map((service, index) => (
                  <div 
                    key={service.id}
                    style={{ perspective: "1000px" }}
                  >
                    <motion.div
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Card 
                        className="relative hover-elevate transition-all duration-300 group border-l-4 border-l-accent/40 overflow-visible" 
                        data-testid={`card-website-service-${index}`}
                      >
                      <motion.div
                        variants={numberCounter}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: index * 0.1 }}
                        className="absolute top-1 right-1 text-3xl sm:text-4xl md:text-6xl font-bold text-accent/5 leading-none"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.div>
                      <CardHeader className="pb-3 relative z-10">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 p-3 shrink-0 shadow-sm"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <Globe className="h-6 w-6 text-accent-foreground" />
                          </motion.div>
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold mb-1 flex items-baseline gap-2" data-testid={`text-website-service-name-${index}`}>
                              <span>{language === "ar" ? service.nameAr : service.name}</span>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mb-2 leading-relaxed" data-testid={`text-website-service-desc-${index}`}>
                              {language === "ar" ? service.descriptionAr : service.description}
                            </p>
                            <p className="text-base font-bold text-accent mb-3">
                              {language === "ar" ? service.priceAr : service.price}
                            </p>
                            <ul className="mt-3 space-y-1.5">
                              {(language === "ar" ? service.featuresAr : service.features).slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardHeader>
                      </Card>
                    </motion.div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
