import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import mobileAppImage from "@assets/generated_images/Mobile_app_mockup_clean_d2c9db56.png";
import websiteImage from "@assets/generated_images/Website_laptop_mockup_elegant_a69c9d74.png";

interface PortfolioSectionProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "Our Portfolio",
    subtitle: "Successful projects delivered for Qatar businesses",
    mobileTab: "Mobile Apps",
    websiteTab: "Websites",
    viewDetails: "View Details",
    mobileApps: [
      { title: "Qatar Cafe", category: "Restaurant Ordering App", desc: "Online ordering and table booking system" },
      { title: "Doha Boutique", category: "E-commerce Mobile App", desc: "Fashion retail mobile shopping experience" },
      { title: "Gulf Services", category: "Service Booking App", desc: "Home services scheduling platform" },
    ],
    websites: [
      { title: "Qatar Company", category: "Business Website", desc: "Corporate website with Arabic/English support" },
      { title: "Retail Store", category: "E-commerce Site", desc: "Full-featured online shopping platform" },
      { title: "Service Business", category: "Booking Portal", desc: "Service booking and management system" },
    ],
  },
  ar: {
    title: "أعمالنا",
    subtitle: "مشاريع ناجحة تم تسليمها للشركات القطرية",
    mobileTab: "تطبيقات الجوال",
    websiteTab: "المواقع الإلكترونية",
    viewDetails: "عرض التفاصيل",
    mobileApps: [
      { title: "مقهى قطر", category: "تطبيق طلب مطعم", desc: "نظام طلب عبر الإنترنت وحجز الطاولات" },
      { title: "بوتيك الدوحة", category: "تطبيق تجارة إلكترونية", desc: "تجربة تسوق أزياء عبر الجوال" },
      { title: "خدمات الخليج", category: "تطبيق حجز خدمات", desc: "منصة جدولة الخدمات المنزلية" },
    ],
    websites: [
      { title: "شركة قطر", category: "موقع أعمال", desc: "موقع شركة بدعم العربية والإنجليزية" },
      { title: "متجر التجزئة", category: "موقع تجارة إلكترونية", desc: "منصة تسوق متكاملة عبر الإنترنت" },
      { title: "شركة خدمات", category: "بوابة حجز", desc: "نظام حجز وإدارة الخدمات" },
    ],
  },
};

export function PortfolioSection({ language }: PortfolioSectionProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState("mobile");

  return (
    <section id="portfolio" className="py-20 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-4" data-testid="text-portfolio-title">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-portfolio-subtitle">
            {t.subtitle}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-auto">
            <TabsTrigger
              value="mobile"
              className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-testid="tab-mobile-apps"
            >
              {t.mobileTab}
            </TabsTrigger>
            <TabsTrigger
              value="websites"
              className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-testid="tab-websites"
            >
              {t.websiteTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mobile" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.mobileApps.map((project, index) => (
                <Card
                  key={index}
                  className="group hover-elevate transition-all duration-300 overflow-hidden"
                  data-testid={`card-mobile-project-${index}`}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={mobileAppImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-testid={`img-mobile-project-${index}`}
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl font-semibold" data-testid={`text-mobile-project-title-${index}`}>{project.title}</CardTitle>
                      <ExternalLink className="h-5 w-5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <Badge variant="secondary" className="w-fit" data-testid={`text-mobile-project-category-${index}`}>
                      {project.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground" data-testid={`text-mobile-project-desc-${index}`}>{project.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="websites" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.websites.map((project, index) => (
                <Card
                  key={index}
                  className="group hover-elevate transition-all duration-300 overflow-hidden"
                  data-testid={`card-website-project-${index}`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={websiteImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-testid={`img-website-project-${index}`}
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl font-semibold" data-testid={`text-website-project-title-${index}`}>{project.title}</CardTitle>
                      <ExternalLink className="h-5 w-5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <Badge variant="secondary" className="w-fit" data-testid={`text-website-project-category-${index}`}>
                      {project.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground" data-testid={`text-website-project-desc-${index}`}>{project.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
