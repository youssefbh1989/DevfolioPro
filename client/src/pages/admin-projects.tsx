import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import type { PortfolioProject } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminProjects() {
  const { isAdmin, isLoading: authLoading } = useAdmin();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"mobile" | "website">("mobile");

  const { data: projects, isLoading: projectsLoading } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/portfolio"],
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      setLocation("/admin/login");
    }
  }, [isAdmin, authLoading, setLocation]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await apiRequest("DELETE", `/api/admin/portfolio/${id}`, {});
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const mobileProjects = projects?.filter(p => p.type === "mobile") || [];
  const websiteProjects = projects?.filter(p => p.type === "website") || [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" data-testid="link-back-to-dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold" style={{ color: "#7D0B2E" }}>
                Manage Portfolio Projects
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "mobile" | "website")}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="mobile" data-testid="tab-mobile-projects">
              Mobile Apps ({mobileProjects.length})
            </TabsTrigger>
            <TabsTrigger value="website" data-testid="tab-website-projects">
              Websites ({websiteProjects.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mobile" className="mt-6">
            <div className="grid gap-4">
              {projectsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
                </div>
              ) : mobileProjects.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No mobile app projects yet. Projects will appear here.
                  </CardContent>
                </Card>
              ) : (
                mobileProjects.map((project) => (
                  <Card key={project.id} data-testid={`project-card-${project.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{project.category}</p>
                          <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            data-testid={`button-delete-${project.id}`}
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="website" className="mt-6">
            <div className="grid gap-4">
              {projectsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
                </div>
              ) : websiteProjects.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No website projects yet. Projects will appear here.
                  </CardContent>
                </Card>
              ) : (
                websiteProjects.map((project) => (
                  <Card key={project.id} data-testid={`project-card-${project.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{project.category}</p>
                          <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            data-testid={`button-delete-${project.id}`}
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
