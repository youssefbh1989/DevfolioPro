import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

interface ContactSectionProps {
  language: "en" | "ar";
}

const content = {
  en: {
    title: "Get Free Consultation",
    subtitle: "Let's discuss your project and bring your ideas to life",
    formTitle: "Send us a message",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    serviceLabel: "Service Needed",
    mobileApp: "Mobile App",
    website: "Website",
    both: "Both",
    projectDesc: "Project Description",
    projectPlaceholder: "Tell us about your project requirements...",
    submit: "Send Message",
    sending: "Sending...",
    successTitle: "Message Sent!",
    successDesc: "We'll get back to you within 24 hours.",
    errorTitle: "Error",
    errorDesc: "Failed to send message. Please try again.",
    contactInfo: "Contact Information",
    contactEmail: "info@qatardigital.qa",
    contactPhone: "+974 1234 5678",
    contactAddress: "Doha, Qatar",
    whatsappCTA: "Chat on WhatsApp",
  },
  ar: {
    title: "احصل على استشارة مجانية",
    subtitle: "دعنا نناقش مشروعك ونحقق أفكارك",
    formTitle: "أرسل لنا رسالة",
    name: "الاسم",
    company: "الشركة",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    serviceLabel: "الخدمة المطلوبة",
    mobileApp: "تطبيق جوال",
    website: "موقع إلكتروني",
    both: "كلاهما",
    projectDesc: "وصف المشروع",
    projectPlaceholder: "أخبرنا عن متطلبات مشروعك...",
    submit: "إرسال الرسالة",
    sending: "جارٍ الإرسال...",
    successTitle: "تم إرسال الرسالة!",
    successDesc: "سنعاود الاتصال بك خلال 24 ساعة.",
    errorTitle: "خطأ",
    errorDesc: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
    contactInfo: "معلومات الاتصال",
    contactEmail: "info@qatardigital.qa",
    contactPhone: "+974 1234 5678",
    contactAddress: "الدوحة، قطر",
    whatsappCTA: "تواصل عبر واتساب",
  },
};

export function ContactSection({ language }: ContactSectionProps) {
  const t = content[language];
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      serviceNeeded: "",
      projectDescription: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: async () => {
      await apiRequest("POST", "/api/analytics/contact", {}).catch(() => {});
      toast({
        title: t.successTitle,
        description: t.successDesc,
      });
      form.reset();
      setSelectedServices([]);
    },
    onError: () => {
      toast({
        title: t.errorTitle,
        description: t.errorDesc,
        variant: "destructive",
      });
    },
  });

  const handleServiceToggle = (service: string) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(newServices);
    form.setValue("serviceNeeded", newServices.join(", "));
  };

  const onSubmit = (data: InsertContactSubmission) => {
    submitMutation.mutate(data);
  };

  const handleWhatsAppClick = async () => {
    await apiRequest("POST", "/api/analytics/whatsapp", {}).catch(() => {});
    window.open("https://wa.me/97412345678", "_blank");
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-muted" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-foreground mb-4" data-testid="text-contact-title">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-contact-subtitle">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif" data-testid="text-form-title">{t.formTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.name}</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.company}</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-company" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.email}</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.phone}</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="serviceNeeded"
                      render={() => (
                        <FormItem>
                          <FormLabel>{t.serviceLabel}</FormLabel>
                          <div className="flex flex-wrap gap-4 mt-2">
                            {[
                              { value: "Mobile App", label: t.mobileApp },
                              { value: "Website", label: t.website },
                              { value: "Both", label: t.both },
                            ].map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={option.value}
                                  checked={selectedServices.includes(option.value)}
                                  onCheckedChange={() => handleServiceToggle(option.value)}
                                  data-testid={`checkbox-${option.value.toLowerCase().replace(" ", "-")}`}
                                />
                                <label
                                  htmlFor={option.value}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.projectDesc}</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              placeholder={t.projectPlaceholder}
                              data-testid="textarea-project-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {submitMutation.isPending ? t.sending : t.submit}
                      {!submitMutation.isPending && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif">{t.contactInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3" data-testid="contact-email">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-foreground">{t.contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3" data-testid="contact-phone">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-foreground">{t.contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3" data-testid="contact-address">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground">{t.contactAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                  size="lg"
                  data-testid="button-whatsapp"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t.whatsappCTA}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
