import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem, cardHover, fadeInUp } from "@/lib/animations";
import type { PortfolioProject } from "@shared/schema";

interface PortfolioSectionProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "Our Portfolio",
    subtitle: "Successful projects delivered for Qatar businesses",
    mobileTab: "Mobile Apps",
    websiteTab: "Websites",
    viewDetails: "View Details",
    close: "Close",
    client: "Client",
    challenge: "The Challenge",
    solution: "Our Solution",
    results: "Results",
    technologies: "Technologies Used",
    loading: "Loading projects...",
  },
  ar: {
    title: "أعمالنا",
    subtitle: "مشاريع ناجحة تم تسليمها للشركات القطرية",
    mobileTab: "تطبيقات الجوال",
    websiteTab: "المواقع الإلكترونية",
    viewDetails: "عرض التفاصيل",
    close: "إغلاق",
    client: "العميل",
    challenge: "التحدي",
    solution: "حلنا",
    results: "النتائج",
    technologies: "التقنيات المستخدمة",
    loading: "جاري تحميل المشاريع...",
  },
};

export function PortfolioSection({ language }: PortfolioSectionProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState("mobile");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { data: projects = [], isLoading } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/portfolio"],
  });

  const mobileProjects = projects.filter(p => p.type === "mobile");
  const websiteProjects = projects.filter(p => p.type === "website");

  const ProjectCard = ({ project }: { project: PortfolioProject }) => (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Card
          className="group transition-all duration-300 overflow-visible cursor-pointer h-full hover-elevate border-l-4 border-l-primary/30"
          onClick={() => setSelectedProject(project)}
          data-testid={`card-${project.type}-project-${project.id}`}
        >
        <motion.div
          className={project.type === "mobile" ? "aspect-[3/4]" : "aspect-[4/3]"}
          style={{ overflow: "hidden", backgroundColor: "var(--muted)" }}
        >
          <motion.img
            src={project.imageUrl}
            alt={language === "ar" ? project.titleAr : project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            data-testid={`img-${project.type}-project-${project.id}`}
          />
        </motion.div>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-xl font-semibold" data-testid={`text-${project.type}-project-title-${project.id}`}>
              {language === "ar" ? project.titleAr : project.title}
            </CardTitle>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink className="h-5 w-5 text-muted-foreground shrink-0" />
            </motion.div>
          </div>
          <Badge variant="secondary" className="w-fit" data-testid={`text-${project.type}-project-category-${project.id}`}>
            {language === "ar" ? project.categoryAr : project.category}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground" data-testid={`text-${project.type}-project-desc-${project.id}`}>
            {language === "ar" ? project.descriptionAr : project.description}
          </p>
          <Button variant="ghost" size="sm" className="mt-4 w-full" data-testid={`button-view-project-${project.id}`}>
            {t.viewDetails}
          </Button>
        </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  return (
    <section id="portfolio" className="relative py-20 md:py-24 bg-gradient-to-b from-background to-muted/30 min-h-[600px] overflow-hidden" ref={ref}>
      {/* Diagonal accent overlay */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rotate-45 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-primary mb-4" data-testid="text-portfolio-title">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-portfolio-subtitle">
            {t.subtitle}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-auto">
            <TabsTrigger
              value="mobile"
              className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-testid="tab-mobile-apps"
            >
              {t.mobileTab}
            </TabsTrigger>
            <TabsTrigger
              value="websites"
              className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-testid="tab-websites"
            >
              {t.websiteTab}
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t.loading}</p>
            </div>
          ) : (
            <>
              <TabsContent value="mobile" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {mobileProjects.length > 0 ? (
                    mobileProjects.map((project) => (
                      <div key={project.id}>
                        <ProjectCard project={project} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No mobile projects available yet.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="websites" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {websiteProjects.length > 0 ? (
                    websiteProjects.map((project) => (
                      <div key={project.id}>
                        <ProjectCard project={project} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No website projects available yet.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-project-details">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-serif" data-testid="text-modal-project-title">
                    {language === "ar" ? selectedProject.titleAr : selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    {language === "ar" ? "تفاصيل المشروع الكاملة" : "Complete project details"}
                  </DialogDescription>
                  <Badge variant="secondary" className="w-fit mt-2">
                    {language === "ar" ? selectedProject.categoryAr : selectedProject.category}
                  </Badge>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  <div className={selectedProject.type === "mobile" ? "aspect-[3/4] max-w-md mx-auto" : "aspect-[16/9]"} 
                    style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
                    <img
                      src={selectedProject.imageUrl}
                      alt={language === "ar" ? selectedProject.titleAr : selectedProject.title}
                      className="w-full h-full object-cover"
                      data-testid="img-modal-project"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {t.client}
                      </h3>
                      <p className="text-muted-foreground" data-testid="text-modal-client">
                        {language === "ar" ? selectedProject.clientAr : selectedProject.client}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {t.challenge}
                      </h3>
                      <p className="text-muted-foreground" data-testid="text-modal-challenge">
                        {language === "ar" ? selectedProject.challengeAr : selectedProject.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {t.solution}
                      </h3>
                      <p className="text-muted-foreground" data-testid="text-modal-solution">
                        {language === "ar" ? selectedProject.solutionAr : selectedProject.solution}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {t.results}
                      </h3>
                      <p className="text-muted-foreground" data-testid="text-modal-results">
                        {language === "ar" ? selectedProject.resultsAr : selectedProject.results}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {t.technologies}
                      </h3>
                      <div className="flex flex-wrap gap-2" data-testid="list-modal-technologies">
                        {selectedProject.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" data-testid={`badge-technology-${index}`}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setSelectedProject(null)} 
                    className="w-full mt-6"
                    data-testid="button-close-modal"
                  >
                    {t.close}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
