import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Palette, Code2, TestTube, Rocket } from "lucide-react";

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

  return (
    <section id="process" className="py-20 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-4" data-testid="text-process-title">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-process-subtitle">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 md:gap-4 max-w-6xl mx-auto">
          {t.steps.map((step, index) => (
            <div key={index} className="relative" data-testid={`step-${index}`}>
              <Card className="hover-elevate transition-all duration-300 h-full">
                <CardContent className="p-6 text-center flex flex-col items-center">
                  <div className="mb-4 relative">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="font-serif font-semibold text-lg mb-2 text-foreground" data-testid={`text-step-title-${index}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-step-desc-${index}`}>
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
              {index < t.steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 w-4 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
