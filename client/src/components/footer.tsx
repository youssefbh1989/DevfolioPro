import { Link, useLocation } from "wouter";
import { Smartphone, Globe, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  en: {
    company: "Company",
    about: "About Us",
    careers: "Careers",
    blog: "Blog",
    privacy: "Privacy Policy",
    services: "Services",
    mobileApps: "Mobile Apps",
    websites: "Websites",
    consulting: "Consulting",
    contact: "Contact",
    email: "info@qatardigital.qa",
    phone: "+974 1234 5678",
    address: "Doha, Qatar",
    followUs: "Follow Us",
    copyright: "© 2024 Qatar Digital Solutions. All rights reserved.",
    tagline: "Mobile Apps & Websites for Qatari Business Growth",
  },
  ar: {
    company: "الشركة",
    about: "من نحن",
    careers: "الوظائف",
    blog: "المدونة",
    privacy: "سياسة الخصوصية",
    services: "الخدمات",
    mobileApps: "تطبيقات الجوال",
    websites: "المواقع الإلكترونية",
    consulting: "الاستشارات",
    contact: "اتصل بنا",
    email: "info@qatardigital.qa",
    phone: "+974 1234 5678",
    address: "الدوحة، قطر",
    followUs: "تابعنا",
    copyright: "© 2024 حلول قطر الرقمية. جميع الحقوق محفوظة.",
    tagline: "تطبيقات الجوال والمواقع الإلكترونية لنمو الأعمال القطرية",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const [location, navigate] = useLocation();
  const isHomePage = location === "/";

  const handleSectionClick = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/");
      // Wait for home page to mount and element to be available
      const scrollWhenReady = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Retry after a short delay if element not found yet
          setTimeout(scrollWhenReady, 50);
        }
      };
      setTimeout(scrollWhenReady, 200);
    }
  };

  return (
    <footer className="bg-foreground/95 text-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif font-bold text-2xl mb-4 text-accent" data-testid="text-footer-company">
              Qatar Digital Solutions
            </h3>
            <p className="text-background/80 mb-6" data-testid="text-footer-tagline">{t.tagline}</p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-md bg-background/10 hover-elevate active-elevate-2 flex items-center justify-center transition-all"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5 text-accent" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-background">{t.company}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-background/80 hover:text-accent transition-colors" data-testid="link-footer-about">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-background/80 hover:text-accent transition-colors" data-testid="link-footer-careers">
                  {t.careers}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-background/80 hover:text-accent transition-colors" data-testid="link-footer-blog">
                  {t.blog}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-background/80 hover:text-accent transition-colors" data-testid="link-footer-privacy">
                  {t.privacy}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-background">{t.services}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleSectionClick("services")}
                  className="text-background/80 hover:text-accent transition-colors text-left"
                  data-testid="link-footer-mobile-apps"
                >
                  {t.mobileApps}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick("services")}
                  className="text-background/80 hover:text-accent transition-colors text-left"
                  data-testid="link-footer-websites"
                >
                  {t.websites}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick("contact")}
                  className="text-background/80 hover:text-accent transition-colors text-left"
                  data-testid="link-footer-consulting"
                >
                  {t.consulting}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-background">{t.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2" data-testid="footer-email">
                <Mail className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <span className="text-background/80">{t.email}</span>
              </li>
              <li className="flex items-start gap-2" data-testid="footer-phone">
                <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <span className="text-background/80">{t.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 text-center">
          <p className="text-background/70" data-testid="text-footer-copyright">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
