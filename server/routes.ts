import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertPortfolioProjectSchema, insertTestimonialSchema, insertBlogPostSchema, insertCareerSchema } from "@shared/schema";

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

  const httpServer = createServer(app);

  return httpServer;
}
