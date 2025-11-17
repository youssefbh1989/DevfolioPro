import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import Home from "@/pages/home";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import Careers from "@/pages/careers";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminProjects from "@/pages/admin-projects";
import AdminServices from "@/pages/admin-services";
import AdminAnalytics from "@/pages/admin-analytics";
import AdminJobApplications from "@/pages/admin-job-applications";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/careers" component={Careers} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/blog" component={Blog} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/projects" component={AdminProjects} />
      <Route path="/admin/services" component={AdminServices} />
      <Route path="/admin/analytics" component={AdminAnalytics} />
      <Route path="/admin/job-applications" component={AdminJobApplications} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function FloatingWhatsAppWrapper() {
  const [location] = useLocation();
  const { language } = useLanguage();
  const isAdminPage = location.startsWith("/admin");

  if (isAdminPage) {
    return null;
  }

  return <FloatingWhatsApp language={language} />;
}

function App() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
            <ScrollToTop />
            <AnalyticsTracker />
            <FloatingWhatsAppWrapper />
            <Toaster />
            <Router />
          </MotionConfig>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
