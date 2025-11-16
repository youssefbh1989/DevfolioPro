import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2 } from "lucide-react";
import type { Service } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminServices() {
  const { isAdmin, isLoading: authLoading } = useAdmin();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/admin/services"],
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      setLocation("/admin/login");
    }
  }, [isAdmin, authLoading, setLocation]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      await apiRequest("DELETE", `/api/admin/services/${id}`, {});
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      await apiRequest("PUT", `/api/admin/services/${service.id}`, {
        ...service,
        isActive: !service.isActive,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({
        title: "Success",
        description: `Service ${!service.isActive ? "activated" : "deactivated"}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service",
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
                Manage Services & Pricing
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4">
          {servicesLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
            </div>
          ) : !services || services.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No services found.
              </CardContent>
            </Card>
          ) : (
            services.map((service) => (
              <Card key={service.id} data-testid={`service-card-${service.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <Badge variant={service.category === "mobile" ? "default" : "secondary"}>
                          {service.category}
                        </Badge>
                        <Badge variant={service.isActive ? "default" : "outline"}>
                          {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                      <p className="text-base font-semibold" style={{ color: "#D4AF37" }}>
                        {service.price}
                      </p>
                      <div className="mt-3 space-y-1">
                        <p className="text-sm font-medium">Features:</p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                          {service.features.length > 3 && (
                            <li>+{service.features.length - 3} more...</li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => toggleActive(service)}
                        data-testid={`button-toggle-${service.id}`}
                      >
                        {service.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        data-testid={`button-delete-${service.id}`}
                        onClick={() => handleDelete(service.id)}
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
      </div>
    </div>
  );
}
