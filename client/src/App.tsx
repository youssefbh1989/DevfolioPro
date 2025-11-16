import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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
