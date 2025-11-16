import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  language: "en" | "ar";
  onLanguageChange: (lang: "en" | "ar") => void;
}

const content = {
  en: {
    logo: "Qatar Digital Solutions",
    services: "Services",
    portfolio: "Portfolio",
    process: "Process",
    whyUs: "Why Us",
    contact: "Contact",
    getStarted: "Get Started",
  },
  ar: {
    logo: "حلول قطر الرقمية",
    services: "خدماتنا",
    portfolio: "أعمالنا",
    process: "العملية",
    whyUs: "لماذا نحن",
    contact: "اتصل بنا",
    getStarted: "ابدأ الآن",
  },
};

export function Navigation({ language, onLanguageChange }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="font-serif font-bold text-xl md:text-2xl text-primary hover-elevate active-elevate-2 transition-colors"
              data-testid="link-logo"
            >
              {t.logo}
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { label: t.services, id: "services" },
              { label: t.portfolio, id: "portfolio" },
              { label: t.process, id: "process" },
              { label: t.whyUs, id: "why-us" },
              { label: t.contact, id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-foreground hover-elevate active-elevate-2 rounded-md transition-all font-medium text-sm"
                data-testid={`link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-language-toggle"
                  aria-label="Change language"
                >
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => onLanguageChange("en")}
                  data-testid="option-language-en"
                  className={language === "en" ? "bg-accent" : ""}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onLanguageChange("ar")}
                  data-testid="option-language-ar"
                  className={language === "ar" ? "bg-accent" : ""}
                >
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => scrollToSection("contact")}
              className="hidden md:inline-flex"
              data-testid="button-nav-cta"
            >
              {t.getStarted}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
            {[
              { label: t.services, id: "services" },
              { label: t.portfolio, id: "portfolio" },
              { label: t.process, id: "process" },
              { label: t.whyUs, id: "why-us" },
              { label: t.contact, id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-3 text-left hover-elevate active-elevate-2 rounded-md transition-all font-medium"
                data-testid={`link-mobile-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="mt-2"
              data-testid="button-mobile-cta"
            >
              {t.getStarted}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
