import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { Career } from "@shared/schema";

interface CareersPageProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "Join Our Team",
    subtitle: "Build the future of digital solutions in Qatar",
    intro: "We're always looking for talented individuals who are passionate about technology and innovation. Join our growing team and help shape the digital landscape of Qatar.",
    benefits: {
      title: "Why Work With Us",
      list: [
        { title: "Competitive Salary", desc: "Industry-leading compensation packages" },
        { title: "Growth Opportunities", desc: "Continuous learning and career development" },
        { title: "Flexible Work", desc: "Hybrid work options available" },
        { title: "Great Culture", desc: "Collaborative and innovative environment" },
      ],
    },
    openPositions: "Open Positions",
    noPositions: "No open positions at the moment. Check back soon!",
    apply: "Apply Now",
    location: "Location",
    type: "Type",
    department: "Department",
    requirements: "Requirements",
    responsibilities: "Responsibilities",
  },
  ar: {
    title: "انضم إلى فريقنا",
    subtitle: "ابنِ مستقبل الحلول الرقمية في قطر",
    intro: "نحن دائمًا نبحث عن أفراد موهوبين متحمسين للتكنولوجيا والابتكار. انضم إلى فريقنا المتنامي وساعد في تشكيل المشهد الرقمي في قطر.",
    benefits: {
      title: "لماذا تعمل معنا",
      list: [
        { title: "راتب تنافسي", desc: "حزم تعويضات رائدة في الصناعة" },
        { title: "فرص النمو", desc: "التعلم المستمر والتطوير الوظيفي" },
        { title: "عمل مرن", desc: "خيارات العمل الهجين متاحة" },
        { title: "ثقافة رائعة", desc: "بيئة تعاونية ومبتكرة" },
      ],
    },
    openPositions: "الوظائف المتاحة",
    noPositions: "لا توجد وظائف متاحة في الوقت الحالي. تحقق مرة أخرى قريباً!",
    apply: "قدم الآن",
    location: "الموقع",
    type: "النوع",
    department: "القسم",
    requirements: "المتطلبات",
    responsibilities: "المسؤوليات",
  },
};

export default function Careers({ language }: CareersPageProps) {
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data: careers = [], isLoading } = useQuery<Career[]>({
    queryKey: ["/api/careers"],
  });

  const openCareers = careers.filter((c) => c.status === "open");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif font-bold text-4xl md:text-6xl text-foreground mb-6" data-testid="text-careers-title">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-careers-subtitle">
              {t.subtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-careers-intro">
              {t.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-24 bg-muted/30" ref={ref}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-12 text-center"
            data-testid="text-benefits-title"
          >
            {t.benefits.title}
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.benefits.list.map((benefit, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-benefit-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-foreground mb-2" data-testid={`text-benefit-title-${index}`}>
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-benefit-desc-${index}`}>
                      {benefit.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-12 text-center"
            data-testid="text-positions-title"
          >
            {t.openPositions}
          </motion.h2>

          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : openCareers.length === 0 ? (
            <div className="text-center text-muted-foreground py-12" data-testid="text-no-positions">
              {t.noPositions}
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {openCareers.map((career, index) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover-elevate transition-all duration-300" data-testid={`card-career-${index}`}>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle className="text-2xl mb-2" data-testid={`text-career-title-${index}`}>
                            {language === "ar" ? career.titleAr : career.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {language === "ar" ? career.departmentAr : career.department}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {language === "ar" ? career.locationAr : career.location}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {language === "ar" ? career.typeAr : career.type}
                            </Badge>
                          </div>
                        </div>
                        <Button data-testid={`button-apply-${index}`}>
                          {t.apply}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-muted-foreground leading-relaxed" data-testid={`text-career-desc-${index}`}>
                            {language === "ar" ? career.descriptionAr : career.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{t.requirements}</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {(language === "ar" ? career.requirementsAr : career.requirements).map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{t.responsibilities}</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {(language === "ar" ? career.responsibilitiesAr : career.responsibilities).map((resp, i) => (
                              <li key={i}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
