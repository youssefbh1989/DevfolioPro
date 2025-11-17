import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAdmin } from "@/hooks/use-admin";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, MessageSquare, Phone } from "lucide-react";
import type { Analytics, ContactSubmission } from "@shared/schema";

export default function AdminAnalytics() {
  const { isAdmin, isLoading: authLoading } = useAdmin();
  const [, setLocation] = useLocation();

  const { data: analytics, isLoading: analyticsLoading } = useQuery<Analytics[]>({
    queryKey: ["/api/admin/analytics"],
  });

  const { data: contacts, isLoading: contactsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact"],
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      setLocation("/admin/login");
    }
  }, [isAdmin, authLoading, setLocation]);

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

  const totalPageViews = analytics?.reduce((sum, a) => sum + a.pageViews, 0) || 0;
  const totalWhatsappClicks = analytics?.reduce((sum, a) => sum + a.whatsappClicks, 0) || 0;
  const totalContacts = contacts?.length || 0;

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
                Analytics Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card data-testid="card-page-views">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {analyticsLoading ? "..." : totalPageViews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                All time visits
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-whatsapp-clicks">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">WhatsApp Clicks</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {analyticsLoading ? "..." : totalWhatsappClicks.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Contact button clicks
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-contact-submissions">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {contactsLoading ? "..." : totalContacts.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Form submissions
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Contact Submissions</CardTitle>
            <CardDescription>Latest inquiries from potential clients</CardDescription>
          </CardHeader>
          <CardContent>
            {contactsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
              </div>
            ) : !contacts || contacts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No contact submissions yet</p>
            ) : (
              <div className="space-y-4">
                {contacts.slice(0, 10).map((contact) => (
                  <div 
                    key={contact.id} 
                    className="border-b pb-4 last:border-0"
                    data-testid={`contact-${contact.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.company}</p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Service:</span> {contact.serviceNeeded}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {contact.projectDescription}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
