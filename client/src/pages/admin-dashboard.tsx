import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { LayoutDashboard, Package, FolderKanban, BarChart, LogOut } from "lucide-react";

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
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ color: "#7D0B2E" }}>
              Admin Dashboard
            </h1>
            <Button
              variant="outline"
              onClick={handleLogout}
              data-testid="button-admin-logout"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/projects" data-testid="link-admin-projects">
            <Card className="hover-elevate cursor-pointer transition-all">
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#7D0B2E" }}
                >
                  <FolderKanban className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Portfolio Projects</CardTitle>
                <CardDescription>
                  Manage mobile apps and website projects
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/services" data-testid="link-admin-services">
            <Card className="hover-elevate cursor-pointer transition-all">
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#7D0B2E" }}
                >
                  <Package className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Services & Pricing</CardTitle>
                <CardDescription>
                  Manage service packages and pricing
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/analytics" data-testid="link-admin-analytics">
            <Card className="hover-elevate cursor-pointer transition-all">
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#7D0B2E" }}
                >
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  View site analytics and metrics
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview of your digital solutions portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✅ Admin dashboard is now active</p>
              <p>📱 Manage portfolio projects from the Projects page</p>
              <p>💰 Update service packages and pricing from the Services page</p>
              <p>📊 Track visitor analytics and form submissions from the Analytics page</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
