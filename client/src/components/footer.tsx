import { Smartphone, Globe, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
  language: "en" | "ar";
}

const content = {
  en: {
    company: "Company",
    about: "About Us",
    careers: "Careers",
    blog: "Blog",
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

export function Footer({ language }: FooterProps) {
  const t = content[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
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
              {[
                { label: t.about, href: "#" },
                { label: t.careers, href: "#" },
                { label: t.blog, href: "#" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-background/80 hover:text-accent transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-background">{t.services}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-background/80 hover:text-accent transition-colors text-left"
                  data-testid="link-footer-mobile-apps"
                >
                  {t.mobileApps}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-background/80 hover:text-accent transition-colors text-left"
                  data-testid="link-footer-websites"
                >
                  {t.websites}
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-accent transition-colors"
                  data-testid="link-footer-consulting"
                >
                  {t.consulting}
                </a>
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
