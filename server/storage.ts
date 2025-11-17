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
  careers,
  type Service,
  type InsertService,
  services,
  type Analytics,
  type InsertAnalytics,
  analytics,
  type JobApplication,
  type InsertJobApplication,
  jobApplications,
  type JobApplicationStatus
} from "@shared/schema";
import { db } from "./db";
import { desc, eq, sql } from "drizzle-orm";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  getAllPortfolioProjects(): Promise<PortfolioProject[]>;
  getPortfolioProjectsByType(type: string): Promise<PortfolioProject[]>;
  getPortfolioProjectById(id: string): Promise<PortfolioProject | undefined>;
  updatePortfolioProject(id: string, project: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined>;
  deletePortfolioProject(id: string): Promise<boolean>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByProjectType(projectType: string): Promise<Testimonial[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createCareer(career: InsertCareer): Promise<Career>;
  getAllCareers(): Promise<Career[]>;
  getOpenCareers(): Promise<Career[]>;
  createService(service: InsertService): Promise<Service>;
  getAllServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getServiceById(id: string): Promise<Service | undefined>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;
  getOrCreateTodayAnalytics(): Promise<Analytics>;
  incrementPageViews(date: string): Promise<void>;
  incrementWhatsappClicks(date: string): Promise<void>;
  incrementContactSubmissions(date: string): Promise<void>;
  getAnalyticsByDateRange(startDate: string, endDate: string): Promise<Analytics[]>;
  getAllAnalytics(): Promise<Analytics[]>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getAllJobApplications(): Promise<JobApplication[]>;
  getJobApplicationsByCareer(careerId: string): Promise<JobApplication[]>;
  updateJobApplicationStatus(id: string, status: JobApplicationStatus): Promise<JobApplication | undefined>;
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

  async updatePortfolioProject(id: string, updateProject: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined> {
    const [project] = await db.update(portfolioProjects)
      .set(updateProject)
      .where(eq(portfolioProjects.id, id))
      .returning();
    return project;
  }

  async deletePortfolioProject(id: string): Promise<boolean> {
    const result = await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }

  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(services.displayOrder, desc(services.createdAt));
  }

  async getActiveServices(): Promise<Service[]> {
    return await db.select().from(services)
      .where(eq(services.isActive, true))
      .orderBy(services.displayOrder, desc(services.createdAt));
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return await db.select().from(services)
      .where(eq(services.category, category))
      .orderBy(services.displayOrder, desc(services.createdAt));
  }

  async getServiceById(id: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async updateService(id: string, updateService: Partial<InsertService>): Promise<Service | undefined> {
    const [service] = await db.update(services)
      .set(updateService)
      .where(eq(services.id, id))
      .returning();
    return service;
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getOrCreateTodayAnalytics(): Promise<Analytics> {
    const today = new Date().toISOString().split('T')[0];
    const [existing] = await db.select().from(analytics).where(eq(analytics.date, today));
    
    if (existing) {
      return existing;
    }

    const [newAnalytics] = await db.insert(analytics).values({
      date: today,
      pageViews: 0,
      whatsappClicks: 0,
      contactSubmissions: 0,
    }).returning();
    
    return newAnalytics;
  }

  async incrementPageViews(date: string): Promise<void> {
    await db.insert(analytics)
      .values({ date, pageViews: 1, whatsappClicks: 0, contactSubmissions: 0 })
      .onConflictDoUpdate({
        target: analytics.date,
        set: { pageViews: sql`${analytics.pageViews} + 1` }
      });
  }

  async incrementWhatsappClicks(date: string): Promise<void> {
    await db.insert(analytics)
      .values({ date, pageViews: 0, whatsappClicks: 1, contactSubmissions: 0 })
      .onConflictDoUpdate({
        target: analytics.date,
        set: { whatsappClicks: sql`${analytics.whatsappClicks} + 1` }
      });
  }

  async incrementContactSubmissions(date: string): Promise<void> {
    await db.insert(analytics)
      .values({ date, pageViews: 0, whatsappClicks: 0, contactSubmissions: 1 })
      .onConflictDoUpdate({
        target: analytics.date,
        set: { contactSubmissions: sql`${analytics.contactSubmissions} + 1` }
      });
  }

  async getAnalyticsByDateRange(startDate: string, endDate: string): Promise<Analytics[]> {
    return await db.select().from(analytics)
      .where(sql`${analytics.date} >= ${startDate} AND ${analytics.date} <= ${endDate}`)
      .orderBy(analytics.date);
  }

  async getAllAnalytics(): Promise<Analytics[]> {
    return await db.select().from(analytics).orderBy(desc(analytics.date));
  }

  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
    const [application] = await db.insert(jobApplications).values(insertApplication).returning();
    return application;
  }

  async getAllJobApplications(): Promise<JobApplication[]> {
    return await db.select().from(jobApplications).orderBy(desc(jobApplications.createdAt));
  }

  async getJobApplicationsByCareer(careerId: string): Promise<JobApplication[]> {
    return await db.select().from(jobApplications)
      .where(eq(jobApplications.careerId, careerId))
      .orderBy(desc(jobApplications.createdAt));
  }

  async updateJobApplicationStatus(id: string, status: JobApplicationStatus): Promise<JobApplication | undefined> {
    const [application] = await db.update(jobApplications)
      .set({ status })
      .where(eq(jobApplications.id, id))
      .returning();
    return application;
  }
}

export const storage = new DbStorage();
