import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, Mail, Phone, Calendar, FileText } from "lucide-react";
import type { JobApplication, Career } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function AdminJobApplications() {
  const { isAdmin, isLoading: authLoading } = useAdmin();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: applications = [], isLoading: applicationsLoading } = useQuery<JobApplication[]>({
    queryKey: ["/api/admin/job-applications"],
  });

  const { data: careers = [] } = useQuery<Career[]>({
    queryKey: ["/api/careers"],
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      setLocation("/admin/login");
    }
  }, [isAdmin, authLoading, setLocation]);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/admin/job-applications/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/job-applications"] });
      toast({
        title: "Status Updated",
        description: "Application status has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const getCareerTitle = (careerId: string) => {
    const career = careers.find((c) => c.id === careerId);
    return career?.title || "Unknown Position";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "reviewing":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "interview":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "hired":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
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

  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const reviewingCount = applications.filter((a) => a.status === "reviewing").length;
  const interviewCount = applications.filter((a) => a.status === "interview").length;

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
              <h1 className="text-2xl font-bold text-primary">
                Job Applications
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card data-testid="card-total-applications">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {applicationsLoading ? "..." : applications.length}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-pending">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <FileText className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {applicationsLoading ? "..." : pendingCount}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-reviewing">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {applicationsLoading ? "..." : reviewingCount}
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-interview">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview Stage</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">
                {applicationsLoading ? "..." : interviewCount}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
            <CardDescription>Review and manage career applications</CardDescription>
          </CardHeader>
          <CardContent>
            {applicationsLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading applications...</div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No applications yet</div>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => (
                  <Card key={application.id} className="hover-elevate" data-testid={`application-card-${application.id}`}>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-[1fr_200px] gap-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-lg text-foreground mb-1" data-testid={`text-applicant-name-${application.id}`}>
                                {application.fullName}
                              </h3>
                              <p className="text-sm text-primary font-medium" data-testid={`text-position-${application.id}`}>
                                {getCareerTitle(application.careerId)}
                              </p>
                            </div>
                            <Badge className={getStatusColor(application.status)} data-testid={`badge-status-${application.id}`}>
                              {application.status}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <a href={`mailto:${application.email}`} className="hover:text-primary" data-testid={`link-email-${application.id}`}>
                                {application.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <a href={`tel:${application.phone}`} className="hover:text-primary" data-testid={`link-phone-${application.id}`}>
                                {application.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(application.createdAt), "MMM dd, yyyy")}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {application.yearsOfExperience} years experience
                            </div>
                          </div>

                          <div className="pt-2">
                            <p className="text-sm font-medium text-foreground mb-1">Cover Letter:</p>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {application.coverLetter}
                            </p>
                          </div>

                          {(application.resumeUrl || application.linkedinUrl || application.portfolioUrl) && (
                            <div className="flex gap-2 pt-2">
                              {application.resumeUrl && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                                    Resume
                                  </a>
                                </Button>
                              )}
                              {application.linkedinUrl && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={application.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                  </a>
                                </Button>
                              )}
                              {application.portfolioUrl && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer">
                                    Portfolio
                                  </a>
                                </Button>
                              )}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Update Status
                          </label>
                          <Select
                            value={application.status}
                            onValueChange={(status) => handleStatusChange(application.id, status)}
                            disabled={updateStatusMutation.isPending}
                          >
                            <SelectTrigger data-testid={`select-status-${application.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="reviewing">Reviewing</SelectItem>
                              <SelectItem value="interview">Interview</SelectItem>
                              <SelectItem value="hired">Hired</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
