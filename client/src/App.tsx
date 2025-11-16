import { Switch, Route } from "wouter";
import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import Home from "@/pages/home";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import Careers from "@/pages/careers";
import Blog from "@/pages/blog";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={() => <About language="en" />} />
      <Route path="/privacy" component={() => <Privacy language="en" />} />
      <Route path="/careers" component={() => <Careers language="en" />} />
      <Route path="/blog" component={() => <Blog language="en" />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
          <Toaster />
          <Router />
        </MotionConfig>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
