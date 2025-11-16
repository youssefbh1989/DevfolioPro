import { useEffect } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

export function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    if (location && !location.startsWith("/admin")) {
      apiRequest("POST", "/api/analytics/pageview", {}).catch(() => {});
    }
  }, [location]);

  return null;
}
