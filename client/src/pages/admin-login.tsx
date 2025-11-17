import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Lock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await apiRequest("POST", "/api/admin/login", { password });
      const data: any = await res.json();
      
      if (data && data.success) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        setLocation("/admin");
      } else {
        toast({
          title: "Login failed",
          description: data?.message || "Invalid password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent">
      {/* Diagonal decorative overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/4 left-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent rotate-45" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent -rotate-45" />
      </div>

      <div className="relative z-10 w-full max-w-md" style={{ perspective: prefersReducedMotion ? "none" : "1000px" }}>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.02, rotateX: -2 }}
          style={{ transformStyle: prefersReducedMotion ? "flat" : "preserve-3d" }}
        >
          <Card className="border-l-4 border-l-accent shadow-2xl shadow-primary/30 overflow-visible backdrop-blur-sm bg-card/95">
            <CardHeader className="space-y-4 text-center pb-6">
              <motion.div 
                className="flex justify-center"
                initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                animate={prefersReducedMotion ? {} : { scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50">
                    <Shield className="w-10 h-10 text-background" />
                  </div>
                  {/* Glow pulse effect */}
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent/30"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </div>
              </motion.div>
              
              <div>
                <CardTitle className="text-3xl font-serif font-bold text-primary mb-2">
                  Admin Dashboard
                </CardTitle>
                <CardDescription className="text-base">
                  Enter your password to access the admin panel
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="pb-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      data-testid="input-admin-password"
                      className="pl-10 h-11 border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-background font-semibold shadow-lg shadow-primary/30 transition-all"
                  disabled={isLoading}
                  data-testid="button-admin-login"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Lock className="h-4 w-4" />
                      </motion.span>
                      Logging in...
                    </span>
                  ) : (
                    "Login to Dashboard"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
