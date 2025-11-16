import { 
  type ContactSubmission, 
  type InsertContactSubmission, 
  contactSubmissions,
  type PortfolioProject,
  type InsertPortfolioProject,
  portfolioProjects,
  type Testimonial,
  type InsertTestimonial,
  testimonials
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
}

export const storage = new DbStorage();
