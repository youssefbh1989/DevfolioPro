import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { LayoutDashboard, Package, FolderKanban, BarChart, LogOut, Users } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, cardHover, magneticHover } from "@/lib/animations";

export default function AdminDashboard() {
  const { isAdmin, isLoading } = useAdmin();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      setLocation("/admin/login");
    }
  }, [isAdmin, isLoading, setLocation]);

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/admin/logout", {});
      queryClient.invalidateQueries({ queryKey: ["/api/admin/status"] });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      setLocation("/admin/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.header 
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="border-b"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">
              Admin Dashboard
            </h1>
            <motion.div
              variants={magneticHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="outline"
                onClick={handleLogout}
                data-testid="button-admin-logout"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1000px" }}
        >
          <motion.div variants={staggerItem}>
            <Link href="/admin/projects" data-testid="link-admin-projects">
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
              >
                <Card className="cursor-pointer transition-all">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4"
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FolderKanban className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <CardTitle>Portfolio Projects</CardTitle>
                    <CardDescription>
                      Manage mobile apps and website projects
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Link href="/admin/services" data-testid="link-admin-services">
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
              >
                <Card className="cursor-pointer transition-all">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4"
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Package className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <CardTitle>Services & Pricing</CardTitle>
                    <CardDescription>
                      Manage service packages and pricing
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Link href="/admin/analytics" data-testid="link-admin-analytics">
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
              >
                <Card className="cursor-pointer transition-all">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4"
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <BarChart className="h-6 w-6 text-white" />
                    </motion.div>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>
                      View site analytics and metrics
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Link href="/admin/job-applications" data-testid="link-admin-job-applications">
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
              >
                <Card className="cursor-pointer transition-all">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4"
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <CardTitle>Job Applications</CardTitle>
                    <CardDescription>
                      Review and manage career applications
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Overview of your digital solutions portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-2 text-sm text-muted-foreground"
              >
                <motion.p variants={staggerItem}>✅ Admin dashboard is now active</motion.p>
                <motion.p variants={staggerItem}>📱 Manage portfolio projects from the Projects page</motion.p>
                <motion.p variants={staggerItem}>💰 Update service packages and pricing from the Services page</motion.p>
                <motion.p variants={staggerItem}>📊 Track visitor analytics and form submissions from the Analytics page</motion.p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
