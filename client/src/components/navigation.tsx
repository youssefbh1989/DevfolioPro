import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  en: {
    logo: "Qatar Digital Solutions",
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    blog: "Blog",
    careers: "Careers",
    contact: "Contact",
    getStarted: "Get Started",
  },
  ar: {
    logo: "حلول قطر الرقمية",
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    portfolio: "أعمالنا",
    blog: "المدونة",
    careers: "الوظائف",
    contact: "اتصل بنا",
    getStarted: "ابدأ الآن",
  },
};

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const t = content[language];
  const isHomePage = location === "/";

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
            <Link href="/" className="font-serif font-bold text-xl md:text-2xl text-primary hover-elevate active-elevate-2 transition-colors" data-testid="link-logo">
              {t.logo}
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-foreground hover-elevate active-elevate-2 rounded-md transition-all font-medium text-sm" data-testid="link-home">
              {t.home}
            </Link>
            <Link href="/about" className="px-4 py-2 text-foreground hover-elevate active-elevate-2 rounded-md transition-all font-medium text-sm" data-testid="link-about">
              {t.about}
            </Link>
            {isHomePage && (
              <>
                <button
                  onClick={() => scrollToSection("services")}
                  className="px-4 py-2 text-foreground hover-elevate active-elevate-2 rounded-md transition-all font-medium text-sm"
                  data-testid="link-services"
                >
                  {t.services}
                </button>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="px-4 py-2 text-foreground hover-elevate active-elevate-2 rounded-md transition-all font-medium text-sm"
                  data-testid="link-portfolio"
                >
                  {t.portfolio}
                </button>
              </>
            )}
            <Link href="/blog" className="px-4 py-2 text-foreground hover-elevate active-elevate-2 rounded-md transition-all font-medium text-sm" data-testid="link-blog">
              {t.blog}
            </Link>
            <Link href="/careers" className="px-4 py-2 text-foreground hover-elevate active-elevate-2 rounded-md transition-all font-medium text-sm" data-testid="link-careers">
              {t.careers}
            </Link>
            {isHomePage && (
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-2 text-foreground hover-elevate active-elevate-2 rounded-md transition-all font-medium text-sm"
                data-testid="link-contact"
              >
                {t.contact}
              </button>
            )}
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
                  onClick={() => setLanguage("en")}
                  data-testid="option-language-en"
                  className={language === "en" ? "bg-accent" : ""}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("ar")}
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
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-left hover-elevate active-elevate-2 rounded-md transition-all font-medium w-full"
              data-testid="link-mobile-home"
            >
              {t.home}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-left hover-elevate active-elevate-2 rounded-md transition-all font-medium w-full"
              data-testid="link-mobile-about"
            >
              {t.about}
            </Link>
            {isHomePage && (
              <>
                <button
                  onClick={() => {
                    scrollToSection("services");
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-left hover-elevate active-elevate-2 rounded-md transition-all font-medium w-full"
                  data-testid="link-mobile-services"
                >
                  {t.services}
                </button>
                <button
                  onClick={() => {
                    scrollToSection("portfolio");
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-left hover-elevate active-elevate-2 rounded-md transition-all font-medium w-full"
                  data-testid="link-mobile-portfolio"
                >
                  {t.portfolio}
                </button>
              </>
            )}
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-left hover-elevate active-elevate-2 rounded-md transition-all font-medium w-full"
              data-testid="link-mobile-blog"
            >
              {t.blog}
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-left hover-elevate active-elevate-2 rounded-md transition-all font-medium w-full"
              data-testid="link-mobile-careers"
            >
              {t.careers}
            </Link>
            {isHomePage && (
              <Button
                onClick={() => {
                  scrollToSection("contact");
                  setMobileMenuOpen(false);
                }}
                className="mt-2"
                data-testid="button-mobile-cta"
              >
                {t.getStarted}
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
