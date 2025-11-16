import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Globe, ShoppingCart, TrendingUp, Layout, Code, Wrench } from "lucide-react";

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

  return (
    <section id="services" className="py-20 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-4" data-testid="text-services-title">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-subtitle">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            <h3 className="font-serif font-semibold text-2xl md:text-3xl text-primary mb-8" data-testid="text-mobile-apps-heading">
              {t.mobileApps.title}
            </h3>
            <div className="space-y-4">
              {t.mobileApps.services.map((service, index) => (
                <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-mobile-service-${index}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-primary/10 p-3 shrink-0">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold mb-1" data-testid={`text-mobile-service-name-${index}`}>
                          {service.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground" data-testid={`text-mobile-service-desc-${index}`}>{service.desc}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif font-semibold text-2xl md:text-3xl text-primary mb-8" data-testid="text-websites-heading">
              {t.websites.title}
            </h3>
            <div className="space-y-4">
              {t.websites.services.map((service, index) => (
                <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-website-service-${index}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-accent/20 p-3 shrink-0">
                        <service.icon className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold mb-1" data-testid={`text-website-service-name-${index}`}>
                          {service.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground" data-testid={`text-website-service-desc-${index}`}>{service.desc}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
