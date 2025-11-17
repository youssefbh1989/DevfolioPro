import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertPortfolioProjectSchema, insertTestimonialSchema, insertBlogPostSchema, insertCareerSchema, insertServiceSchema, insertJobApplicationSchema, jobApplicationStatusSchema } from "@shared/schema";
import { requireAdmin, loginAdmin, logoutAdmin, checkAdminStatus } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json(submission);
    } catch (error: any) {
      res.status(400).json({ 
        error: "Validation failed", 
        details: error.errors || error.message 
      });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.get("/api/portfolio", async (req, res) => {
    try {
      const { type } = req.query;
      if (type && typeof type === "string") {
        const projects = await storage.getPortfolioProjectsByType(type);
        res.json(projects);
      } else {
        const projects = await storage.getAllPortfolioProjects();
        res.json(projects);
      }
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/portfolio/:id", async (req, res) => {
    try {
      const project = await storage.getPortfolioProjectById(req.params.id);
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/portfolio", async (req, res) => {
    try {
      const validatedData = insertPortfolioProjectSchema.parse(req.body);
      const project = await storage.createPortfolioProject(validatedData);
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ 
        error: "Validation failed", 
        details: error.errors || error.message 
      });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const { projectType } = req.query;
      if (projectType && typeof projectType === "string") {
        const testimonials = await storage.getTestimonialsByProjectType(projectType);
        res.json(testimonials);
      } else {
        const testimonials = await storage.getAllTestimonials();
        res.json(testimonials);
      }
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json(testimonial);
    } catch (error: any) {
      res.status(400).json({ 
        error: "Validation failed", 
        details: error.errors || error.message 
      });
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        res.status(404).json({ error: "Blog post not found" });
        return;
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ 
        error: "Validation failed", 
        details: error.errors || error.message 
      });
    }
  });

  app.get("/api/careers", async (req, res) => {
    try {
      const careers = await storage.getOpenCareers();
      res.json(careers);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch careers" });
    }
  });

  app.post("/api/careers", async (req, res) => {
    try {
      const validatedData = insertCareerSchema.parse(req.body);
      const career = await storage.createCareer(validatedData);
      res.json(career);
    } catch (error: any) {
      res.status(400).json({ 
        error: "Validation failed", 
        details: error.errors || error.message 
      });
    }
  });

  app.post("/api/job-applications", async (req, res) => {
    try {
      const validatedData = insertJobApplicationSchema.parse(req.body);
      const application = await storage.createJobApplication(validatedData);
      res.json(application);
    } catch (error: any) {
      res.status(400).json({ 
        error: "Validation failed", 
        details: error.errors || error.message 
      });
    }
  });

  app.get("/api/admin/job-applications", requireAdmin, async (req, res) => {
    try {
      const applications = await storage.getAllJobApplications();
      res.json(applications);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch job applications" });
    }
  });

  app.patch("/api/admin/job-applications/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        res.status(400).json({ error: "Status is required" });
        return;
      }
      
      const validationResult = jobApplicationStatusSchema.safeParse(status);
      if (!validationResult.success) {
        res.status(400).json({ 
          error: "Invalid status value", 
          details: "Status must be one of: pending, reviewing, interview, hired, rejected" 
        });
        return;
      }
      
      const application = await storage.updateJobApplicationStatus(req.params.id, validationResult.data);
      if (!application) {
        res.status(404).json({ error: "Application not found" });
        return;
      }
      res.json(application);
    } catch (error: any) {
      res.status(400).json({ error: "Update failed", details: error.message });
    }
  });

  app.post("/api/admin/login", loginAdmin);
  app.post("/api/admin/logout", logoutAdmin);
  app.get("/api/admin/status", checkAdminStatus);

  app.put("/api/admin/portfolio/:id", requireAdmin, async (req, res) => {
    try {
      const project = await storage.updatePortfolioProject(req.params.id, req.body);
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: "Update failed", details: error.message });
    }
  });

  app.delete("/api/admin/portfolio/:id", requireAdmin, async (req, res) => {
    try {
      const success = await storage.deletePortfolioProject(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.json({ success: true, message: "Project deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: "Delete failed", details: error.message });
    }
  });

  app.get("/api/services", async (req, res) => {
    try {
      const { category } = req.query;
      if (category && typeof category === "string") {
        const services = await storage.getServicesByCategory(category);
        res.json(services);
      } else {
        const services = await storage.getActiveServices();
        res.json(services);
      }
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/admin/services", requireAdmin, async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.post("/api/admin/services", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.json(service);
    } catch (error: any) {
      res.status(400).json({ 
        error: "Validation failed", 
        details: error.errors || error.message 
      });
    }
  });

  app.put("/api/admin/services/:id", requireAdmin, async (req, res) => {
    try {
      const service = await storage.updateService(req.params.id, req.body);
      if (!service) {
        res.status(404).json({ error: "Service not found" });
        return;
      }
      res.json(service);
    } catch (error: any) {
      res.status(400).json({ error: "Update failed", details: error.message });
    }
  });

  app.delete("/api/admin/services/:id", requireAdmin, async (req, res) => {
    try {
      const success = await storage.deleteService(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Service not found" });
        return;
      }
      res.json({ success: true, message: "Service deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: "Delete failed", details: error.message });
    }
  });

  app.post("/api/analytics/pageview", async (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await storage.incrementPageViews(today);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to track pageview" });
    }
  });

  app.post("/api/analytics/whatsapp", async (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await storage.incrementWhatsappClicks(today);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to track WhatsApp click" });
    }
  });

  app.post("/api/analytics/contact", async (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await storage.incrementContactSubmissions(today);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to track contact submission" });
    }
  });

  app.get("/api/admin/analytics", requireAdmin, async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      if (startDate && endDate && typeof startDate === "string" && typeof endDate === "string") {
        const analytics = await storage.getAnalyticsByDateRange(startDate, endDate);
        res.json(analytics);
      } else {
        const analytics = await storage.getAllAnalytics();
        res.json(analytics);
      }
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.get("/api/admin/contact", requireAdmin, async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
