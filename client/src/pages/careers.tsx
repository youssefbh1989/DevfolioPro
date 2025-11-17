import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Briefcase, Clock, Send } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { Career, InsertJobApplication } from "@shared/schema";
import { insertJobApplicationSchema } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const content = {
  en: {
    title: "Join Our Team",
    subtitle: "Build the future of digital solutions in Qatar",
    intro: "We're always looking for talented individuals who are passionate about technology and innovation. Join our growing team and help shape the digital landscape of Qatar.",
    benefits: {
      title: "Why Work With Us",
      list: [
        { title: "Competitive Salary", desc: "Industry-leading compensation packages" },
        { title: "Growth Opportunities", desc: "Continuous learning and career development" },
        { title: "Flexible Work", desc: "Hybrid work options available" },
        { title: "Great Culture", desc: "Collaborative and innovative environment" },
      ],
    },
    openPositions: "Open Positions",
    noPositions: "No open positions at the moment. Check back soon!",
    apply: "Apply Now",
    location: "Location",
    type: "Type",
    department: "Department",
    requirements: "Requirements",
    responsibilities: "Responsibilities",
    applicationForm: {
      title: "Apply for this Position",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      yearsOfExperience: "Years of Experience",
      selectYears: "Select years",
      coverLetter: "Cover Letter",
      coverLetterPlaceholder: "Tell us why you're a great fit for this role...",
      resumeUrl: "Resume URL (optional)",
      linkedinUrl: "LinkedIn Profile (optional)",
      portfolioUrl: "Portfolio URL (optional)",
      submit: "Submit Application",
      submitting: "Submitting...",
      successTitle: "Application Submitted!",
      successDesc: "We'll review your application and get back to you soon.",
      errorTitle: "Error",
      errorDesc: "Failed to submit application. Please try again.",
    },
  },
  ar: {
    title: "انضم إلى فريقنا",
    subtitle: "ابنِ مستقبل الحلول الرقمية في قطر",
    intro: "نحن دائمًا نبحث عن أفراد موهوبين متحمسين للتكنولوجيا والابتكار. انضم إلى فريقنا المتنامي وساعد في تشكيل المشهد الرقمي في قطر.",
    benefits: {
      title: "لماذا تعمل معنا",
      list: [
        { title: "راتب تنافسي", desc: "حزم تعويضات رائدة في الصناعة" },
        { title: "فرص النمو", desc: "التعلم المستمر والتطوير الوظيفي" },
        { title: "عمل مرن", desc: "خيارات العمل الهجين متاحة" },
        { title: "ثقافة رائعة", desc: "بيئة تعاونية ومبتكرة" },
      ],
    },
    openPositions: "الوظائف المتاحة",
    noPositions: "لا توجد وظائف متاحة في الوقت الحالي. تحقق مرة أخرى قريباً!",
    apply: "قدم الآن",
    location: "الموقع",
    type: "النوع",
    department: "القسم",
    requirements: "المتطلبات",
    responsibilities: "المسؤوليات",
    applicationForm: {
      title: "قدم طلبك لهذه الوظيفة",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      yearsOfExperience: "سنوات الخبرة",
      selectYears: "اختر السنوات",
      coverLetter: "خطاب التقديم",
      coverLetterPlaceholder: "أخبرنا لماذا أنت مناسب لهذا الدور...",
      resumeUrl: "رابط السيرة الذاتية (اختياري)",
      linkedinUrl: "ملف LinkedIn الشخصي (اختياري)",
      portfolioUrl: "رابط محفظة الأعمال (اختياري)",
      submit: "إرسال الطلب",
      submitting: "جارٍ الإرسال...",
      successTitle: "تم إرسال الطلب!",
      successDesc: "سنقوم بمراجعة طلبك والرد عليك قريباً.",
      errorTitle: "خطأ",
      errorDesc: "فشل إرسال الطلب. يرجى المحاولة مرة أخرى.",
    },
  },
};

export default function Careers() {
  const { language } = useLanguage();
  const t = content[language];
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<InsertJobApplication>({
    resolver: zodResolver(insertJobApplicationSchema),
    defaultValues: {
      careerId: "",
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resumeUrl: "",
      linkedinUrl: "",
      portfolioUrl: "",
      yearsOfExperience: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertJobApplication) => {
      return await apiRequest("POST", "/api/job-applications", data);
    },
    onSuccess: () => {
      toast({
        title: t.applicationForm.successTitle,
        description: t.applicationForm.successDesc,
      });
      form.reset();
      setIsDialogOpen(false);
      setSelectedCareer(null);
    },
    onError: () => {
      toast({
        title: t.applicationForm.errorTitle,
        description: t.applicationForm.errorDesc,
        variant: "destructive",
      });
    },
  });

  const handleApplyClick = (career: Career) => {
    setSelectedCareer(career);
    form.setValue("careerId", career.id);
    setIsDialogOpen(true);
  };

  const onSubmit = (data: InsertJobApplication) => {
    submitMutation.mutate(data);
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const { data: careers = [], isLoading } = useQuery<Career[]>({
    queryKey: ["/api/careers"],
  });

  const openCareers = careers.filter((c) => c.status === "open");

  return (
    <div className={`min-h-screen bg-background ${language === "ar" ? "rtl" : ""}`}>
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif font-bold text-4xl md:text-6xl text-foreground mb-6" data-testid="text-careers-title">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-careers-subtitle">
              {t.subtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-careers-intro">
              {t.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-24 bg-muted/30" ref={ref}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-12 text-center"
            data-testid="text-benefits-title"
          >
            {t.benefits.title}
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.benefits.list.map((benefit, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-benefit-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-foreground mb-2" data-testid={`text-benefit-title-${index}`}>
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-benefit-desc-${index}`}>
                      {benefit.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-12 text-center"
            data-testid="text-positions-title"
          >
            {t.openPositions}
          </motion.h2>

          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : openCareers.length === 0 ? (
            <div className="text-center text-muted-foreground py-12" data-testid="text-no-positions">
              {t.noPositions}
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {openCareers.map((career, index) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover-elevate transition-all duration-300" data-testid={`card-career-${index}`}>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle className="text-2xl mb-2" data-testid={`text-career-title-${index}`}>
                            {language === "ar" ? career.titleAr : career.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {language === "ar" ? career.departmentAr : career.department}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {language === "ar" ? career.locationAr : career.location}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {language === "ar" ? career.typeAr : career.type}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleApplyClick(career)}
                          data-testid={`button-apply-${index}`}
                        >
                          {t.apply}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-muted-foreground leading-relaxed" data-testid={`text-career-desc-${index}`}>
                            {language === "ar" ? career.descriptionAr : career.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{t.requirements}</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {(language === "ar" ? career.requirementsAr : career.requirements).map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{t.responsibilities}</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {(language === "ar" ? career.responsibilitiesAr : career.responsibilities).map((resp, i) => (
                              <li key={i}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-primary">
              {t.applicationForm.title}
            </DialogTitle>
            {selectedCareer && (
              <p className="text-muted-foreground">
                {language === "ar" ? selectedCareer.titleAr : selectedCareer.title}
              </p>
            )}
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.applicationForm.fullName}</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-full-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.applicationForm.email}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} data-testid="input-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.applicationForm.phone}</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.applicationForm.yearsOfExperience}</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-years-experience">
                            <SelectValue placeholder={t.applicationForm.selectYears} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 {language === "ar" ? "سنة" : "years"}</SelectItem>
                          <SelectItem value="1-3">1-3 {language === "ar" ? "سنوات" : "years"}</SelectItem>
                          <SelectItem value="3-5">3-5 {language === "ar" ? "سنوات" : "years"}</SelectItem>
                          <SelectItem value="5-10">5-10 {language === "ar" ? "سنوات" : "years"}</SelectItem>
                          <SelectItem value="10+">10+ {language === "ar" ? "سنوات" : "years"}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.applicationForm.coverLetter}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={6}
                        placeholder={t.applicationForm.coverLetterPlaceholder}
                        data-testid="textarea-cover-letter"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.applicationForm.resumeUrl}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://" data-testid="input-resume-url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.applicationForm.linkedinUrl}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://linkedin.com/in/..." data-testid="input-linkedin" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="portfolioUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.applicationForm.portfolioUrl}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://" data-testid="input-portfolio" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={submitMutation.isPending}
                  data-testid="button-cancel-application"
                >
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </Button>
                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="bg-primary hover:bg-primary/90"
                  data-testid="button-submit-application"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {submitMutation.isPending ? t.applicationForm.submitting : t.applicationForm.submit}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
