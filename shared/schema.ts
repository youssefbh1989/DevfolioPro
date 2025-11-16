import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, date, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceNeeded: text("service_needed").notNull(),
  projectDescription: text("project_description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const portfolioProjects = pgTable("portfolio_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  titleAr: text("title_ar").notNull(),
  category: text("category").notNull(),
  categoryAr: text("category_ar").notNull(),
  description: text("description").notNull(),
  descriptionAr: text("description_ar").notNull(),
  type: text("type").notNull(), // "mobile" or "website"
  client: text("client").notNull(),
  clientAr: text("client_ar").notNull(),
  challenge: text("challenge").notNull(),
  challengeAr: text("challenge_ar").notNull(),
  solution: text("solution").notNull(),
  solutionAr: text("solution_ar").notNull(),
  results: text("results").notNull(),
  resultsAr: text("results_ar").notNull(),
  technologies: text("technologies").array().notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  projectDescription: z.string().min(10, "Please provide more details about your project"),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientName: text("client_name").notNull(),
  clientNameAr: text("client_name_ar").notNull(),
  clientPosition: text("client_position").notNull(),
  clientPositionAr: text("client_position_ar").notNull(),
  clientCompany: text("client_company").notNull(),
  clientCompanyAr: text("client_company_ar").notNull(),
  rating: text("rating").notNull(), // 1-5 stars
  testimonial: text("testimonial").notNull(),
  testimonialAr: text("testimonial_ar").notNull(),
  projectType: text("project_type").notNull(), // "mobile" or "website"
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPortfolioProjectSchema = createInsertSchema(portfolioProjects).omit({
  id: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
}).extend({
  rating: z.string().regex(/^[1-5]$/, "Rating must be between 1 and 5"),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  titleAr: text("title_ar").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  excerptAr: text("excerpt_ar").notNull(),
  content: text("content").notNull(),
  contentAr: text("content_ar").notNull(),
  category: text("category").notNull(),
  categoryAr: text("category_ar").notNull(),
  author: text("author").notNull(),
  authorAr: text("author_ar").notNull(),
  imageUrl: text("image_url").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const careers = pgTable("careers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  titleAr: text("title_ar").notNull(),
  department: text("department").notNull(),
  departmentAr: text("department_ar").notNull(),
  location: text("location").notNull(),
  locationAr: text("location_ar").notNull(),
  type: text("type").notNull(), // "full-time", "part-time", "contract"
  typeAr: text("type_ar").notNull(),
  description: text("description").notNull(),
  descriptionAr: text("description_ar").notNull(),
  requirements: text("requirements").array().notNull(),
  requirementsAr: text("requirements_ar").array().notNull(),
  responsibilities: text("responsibilities").array().notNull(),
  responsibilitiesAr: text("responsibilities_ar").array().notNull(),
  status: text("status").notNull().default("open"), // "open" or "closed"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});

export const insertCareerSchema = createInsertSchema(careers).omit({
  id: true,
  createdAt: true,
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  description: text("description").notNull(),
  descriptionAr: text("description_ar").notNull(),
  price: text("price").notNull(),
  priceAr: text("price_ar").notNull(),
  category: text("category").notNull(), // "mobile" or "website"
  features: text("features").array().notNull(),
  featuresAr: text("features_ar").array().notNull(),
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: date("date").notNull().unique(),
  pageViews: integer("page_views").notNull().default(0),
  whatsappClicks: integer("whatsapp_clicks").notNull().default(0),
  contactSubmissions: integer("contact_submissions").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  createdAt: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertPortfolioProject = z.infer<typeof insertPortfolioProjectSchema>;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertCareer = z.infer<typeof insertCareerSchema>;
export type Career = typeof careers.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;
