import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users, Award } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const content = {
  en: {
    title: "About Qatar Digital Solutions",
    subtitle: "Your trusted partner in digital transformation",
    story: {
      title: "Our Story",
      text: "Founded in Qatar with a vision to empower local businesses through cutting-edge digital solutions, Qatar Digital Solutions has grown into a leading provider of mobile apps and websites. We understand the unique needs of the Qatari market and combine international best practices with local market insights.",
    },
    mission: {
      title: "Our Mission",
      text: "To empower Qatar businesses with world-class digital solutions that drive growth, enhance customer experiences, and contribute to Qatar's digital transformation vision.",
      icon: Target,
    },
    vision: {
      title: "Our Vision",
      text: "To be the most trusted digital partner for businesses across Qatar, recognized for innovation, quality, and exceptional client relationships.",
      icon: Eye,
    },
    values: {
      title: "Our Values",
      list: [
        {
          icon: Award,
          title: "Excellence",
          desc: "We deliver nothing less than exceptional quality in every project",
        },
        {
          icon: Users,
          title: "Client-Centric",
          desc: "Your success is our success. We put clients at the heart of everything we do",
        },
        {
          icon: Target,
          title: "Innovation",
          desc: "We stay ahead of technology trends to give you a competitive edge",
        },
      ],
    },
    stats: [
      { number: "50+", label: "Projects Delivered" },
      { number: "40+", label: "Happy Clients" },
      { number: "5+", label: "Years Experience" },
      { number: "95%", label: "Client Satisfaction" },
    ],
  },
  ar: {
    title: "عن قطر للحلول الرقمية",
    subtitle: "شريكك الموثوق في التحول الرقمي",
    story: {
      title: "قصتنا",
      text: "تأسست في قطر برؤية لتمكين الشركات المحلية من خلال الحلول الرقمية المتطورة، نمت قطر للحلول الرقمية لتصبح مزودًا رائدًا لتطبيقات الجوال والمواقع الإلكترونية. نحن نفهم الاحتياجات الفريدة للسوق القطري ونجمع بين أفضل الممارسات الدولية والرؤى المحلية للسوق.",
    },
    mission: {
      title: "مهمتنا",
      text: "تمكين الشركات القطرية بحلول رقمية عالمية المستوى تدفع النمو وتعزز تجارب العملاء وتساهم في رؤية قطر للتحول الرقمي.",
      icon: Target,
    },
    vision: {
      title: "رؤيتنا",
      text: "أن نكون الشريك الرقمي الأكثر موثوقية للشركات في جميع أنحاء قطر، معترف بنا من أجل الابتكار والجودة والعلاقات الاستثنائية مع العملاء.",
      icon: Eye,
    },
    values: {
      title: "قيمنا",
      list: [
        {
          icon: Award,
          title: "التميز",
          desc: "نقدم جودة استثنائية لا غير في كل مشروع",
        },
        {
          icon: Users,
          title: "محور العميل",
          desc: "نجاحك هو نجاحنا. نضع العملاء في قلب كل ما نقوم به",
        },
        {
          icon: Target,
          title: "الابتكار",
          desc: "نبقى في طليعة اتجاهات التكنولوجيا لنمنحك ميزة تنافسية",
        },
      ],
    },
    stats: [
      { number: "+50", label: "مشروع تم تسليمه" },
      { number: "+40", label: "عميل سعيد" },
      { number: "+5", label: "سنوات من الخبرة" },
      { number: "%95", label: "رضا العملاء" },
    ],
  },
};

export default function About() {
  const { language } = useLanguage();
  const t = content[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className={`min-h-screen bg-background ${language === "ar" ? "rtl" : ""}`}>
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif font-bold text-4xl md:text-6xl text-foreground mb-6" data-testid="text-about-title">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-about-subtitle">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-y">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="text-center"
                data-testid={`stat-${index}`}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-24" ref={ref}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-6 text-center" data-testid="text-story-title">
              {t.story.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center" data-testid="text-story-content">
              {t.story.text}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-foreground mb-4" data-testid="text-mission-title">
                    {t.mission.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-mission-content">
                    {t.mission.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-6">
                    <Eye className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-foreground mb-4" data-testid="text-vision-title">
                    {t.vision.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-vision-content">
                    {t.vision.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-12 text-center"
            data-testid="text-values-title"
          >
            {t.values.title}
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8"
          >
            {t.values.list.map((value, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-value-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-6">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold text-xl text-foreground mb-3" data-testid={`text-value-title-${index}`}>
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-value-desc-${index}`}>
                      {value.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
