import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import type { PortfolioProject, InsertPortfolioProject } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminProjects() {
  const { isAdmin, isLoading: authLoading } = useAdmin();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"mobile" | "website">("mobile");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<InsertPortfolioProject>>({
    type: "mobile",
    technologies: [],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/portfolio"],
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      setLocation("/admin/login");
    }
  }, [isAdmin, authLoading, setLocation]);

  const createMutation = useMutation({
    mutationFn: async (data: InsertPortfolioProject) => {
      return apiRequest("POST", "/api/portfolio", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({
        title: "Success",
        description: "Project added successfully",
      });
      setIsAddDialogOpen(false);
      setNewProject({
        type: "mobile",
        technologies: [],
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    },
  });

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

  const handleAddProject = () => {
    const techString = (newProject as any).technologiesString || "";
    const technologies = techString.split(',').map((t: string) => t.trim()).filter((t: string) => t);

    const projectData: InsertPortfolioProject = {
      title: newProject.title || "",
      titleAr: newProject.titleAr || "",
      category: newProject.category || "",
      categoryAr: newProject.categoryAr || "",
      description: newProject.description || "",
      descriptionAr: newProject.descriptionAr || "",
      type: newProject.type || "mobile",
      client: newProject.client || "",
      clientAr: newProject.clientAr || "",
      challenge: newProject.challenge || "",
      challengeAr: newProject.challengeAr || "",
      solution: newProject.solution || "",
      solutionAr: newProject.solutionAr || "",
      results: newProject.results || "",
      resultsAr: newProject.resultsAr || "",
      technologies,
      imageUrl: newProject.imageUrl || "",
    };

    createMutation.mutate(projectData);
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  style={{ backgroundColor: "#7D0B2E", color: "white" }}
                  data-testid="button-add-project"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Project Type</Label>
                      <Select 
                        value={newProject.type} 
                        onValueChange={(value) => setNewProject({ ...newProject, type: value as "mobile" | "website" })}
                      >
                        <SelectTrigger id="type" data-testid="select-project-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mobile">Mobile App</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        placeholder="/path/to/image.jpg"
                        value={newProject.imageUrl || ""}
                        onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                        data-testid="input-image-url"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title (English)</Label>
                      <Input
                        id="title"
                        placeholder="Project Title"
                        value={newProject.title || ""}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        data-testid="input-title-en"
                      />
                    </div>
                    <div>
                      <Label htmlFor="titleAr">Title (Arabic)</Label>
                      <Input
                        id="titleAr"
                        placeholder="عنوان المشروع"
                        dir="rtl"
                        value={newProject.titleAr || ""}
                        onChange={(e) => setNewProject({ ...newProject, titleAr: e.target.value })}
                        data-testid="input-title-ar"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category (English)</Label>
                      <Input
                        id="category"
                        placeholder="E-commerce, Healthcare, etc."
                        value={newProject.category || ""}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                        data-testid="input-category-en"
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoryAr">Category (Arabic)</Label>
                      <Input
                        id="categoryAr"
                        placeholder="التجارة الإلكترونية، الرعاية الصحية، إلخ"
                        dir="rtl"
                        value={newProject.categoryAr || ""}
                        onChange={(e) => setNewProject({ ...newProject, categoryAr: e.target.value })}
                        data-testid="input-category-ar"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="client">Client (English)</Label>
                      <Input
                        id="client"
                        placeholder="Client Name"
                        value={newProject.client || ""}
                        onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                        data-testid="input-client-en"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientAr">Client (Arabic)</Label>
                      <Input
                        id="clientAr"
                        placeholder="اسم العميل"
                        dir="rtl"
                        value={newProject.clientAr || ""}
                        onChange={(e) => setNewProject({ ...newProject, clientAr: e.target.value })}
                        data-testid="input-client-ar"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="description">Description (English)</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief project description"
                        value={newProject.description || ""}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        data-testid="input-description-en"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="descriptionAr">Description (Arabic)</Label>
                      <Textarea
                        id="descriptionAr"
                        placeholder="وصف موجز للمشروع"
                        dir="rtl"
                        value={newProject.descriptionAr || ""}
                        onChange={(e) => setNewProject({ ...newProject, descriptionAr: e.target.value })}
                        data-testid="input-description-ar"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="challenge">Challenge (English)</Label>
                      <Textarea
                        id="challenge"
                        placeholder="What was the challenge?"
                        value={newProject.challenge || ""}
                        onChange={(e) => setNewProject({ ...newProject, challenge: e.target.value })}
                        data-testid="input-challenge-en"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="challengeAr">Challenge (Arabic)</Label>
                      <Textarea
                        id="challengeAr"
                        placeholder="ما هو التحدي؟"
                        dir="rtl"
                        value={newProject.challengeAr || ""}
                        onChange={(e) => setNewProject({ ...newProject, challengeAr: e.target.value })}
                        data-testid="input-challenge-ar"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="solution">Solution (English)</Label>
                      <Textarea
                        id="solution"
                        placeholder="How did we solve it?"
                        value={newProject.solution || ""}
                        onChange={(e) => setNewProject({ ...newProject, solution: e.target.value })}
                        data-testid="input-solution-en"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="solutionAr">Solution (Arabic)</Label>
                      <Textarea
                        id="solutionAr"
                        placeholder="كيف قمنا بحلها؟"
                        dir="rtl"
                        value={newProject.solutionAr || ""}
                        onChange={(e) => setNewProject({ ...newProject, solutionAr: e.target.value })}
                        data-testid="input-solution-ar"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="results">Results (English)</Label>
                      <Textarea
                        id="results"
                        placeholder="What were the results?"
                        value={newProject.results || ""}
                        onChange={(e) => setNewProject({ ...newProject, results: e.target.value })}
                        data-testid="input-results-en"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="resultsAr">Results (Arabic)</Label>
                      <Textarea
                        id="resultsAr"
                        placeholder="ما هي النتائج؟"
                        dir="rtl"
                        value={newProject.resultsAr || ""}
                        onChange={(e) => setNewProject({ ...newProject, resultsAr: e.target.value })}
                        data-testid="input-results-ar"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                    <Input
                      id="technologies"
                      placeholder="React, Node.js, PostgreSQL, etc."
                      value={(newProject as any).technologiesString || ""}
                      onChange={(e) => setNewProject({ ...newProject, technologiesString: e.target.value } as any)}
                      data-testid="input-technologies"
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)}
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddProject}
                      disabled={createMutation.isPending}
                      style={{ backgroundColor: "#7D0B2E", color: "white" }}
                      data-testid="button-submit-project"
                    >
                      {createMutation.isPending ? "Adding..." : "Add Project"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
