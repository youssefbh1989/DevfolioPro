import { 
  type ContactSubmission, 
  type InsertContactSubmission, 
  contactSubmissions,
  type PortfolioProject,
  type InsertPortfolioProject,
  portfolioProjects,
  type Testimonial,
  type InsertTestimonial,
  testimonials,
  type BlogPost,
  type InsertBlogPost,
  blogPosts,
  type Career,
  type InsertCareer,
  careers
} from "@shared/schema";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  getAllPortfolioProjects(): Promise<PortfolioProject[]>;
  getPortfolioProjectsByType(type: string): Promise<PortfolioProject[]>;
  getPortfolioProjectById(id: string): Promise<PortfolioProject | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByProjectType(projectType: string): Promise<Testimonial[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createCareer(career: InsertCareer): Promise<Career>;
  getAllCareers(): Promise<Career[]>;
  getOpenCareers(): Promise<Career[]>;
}

export class DbStorage implements IStorage {
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createPortfolioProject(insertProject: InsertPortfolioProject): Promise<PortfolioProject> {
    const [project] = await db.insert(portfolioProjects).values(insertProject).returning();
    return project;
  }

  async getAllPortfolioProjects(): Promise<PortfolioProject[]> {
    return await db.select().from(portfolioProjects).orderBy(desc(portfolioProjects.createdAt));
  }

  async getPortfolioProjectsByType(type: string): Promise<PortfolioProject[]> {
    return await db.select().from(portfolioProjects)
      .where(eq(portfolioProjects.type, type))
      .orderBy(desc(portfolioProjects.createdAt));
  }

  async getPortfolioProjectById(id: string): Promise<PortfolioProject | undefined> {
    const [project] = await db.select().from(portfolioProjects).where(eq(portfolioProjects.id, id));
    return project;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getTestimonialsByProjectType(projectType: string): Promise<Testimonial[]> {
    return await db.select().from(testimonials)
      .where(eq(testimonials.projectType, projectType))
      .orderBy(desc(testimonials.createdAt));
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createCareer(insertCareer: InsertCareer): Promise<Career> {
    const [career] = await db.insert(careers).values(insertCareer).returning();
    return career;
  }

  async getAllCareers(): Promise<Career[]> {
    return await db.select().from(careers).orderBy(desc(careers.createdAt));
  }

  async getOpenCareers(): Promise<Career[]> {
    return await db.select().from(careers)
      .where(eq(careers.status, "open"))
      .orderBy(desc(careers.createdAt));
  }
}

export const storage = new DbStorage();
