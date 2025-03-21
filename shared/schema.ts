import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (keeping for reference)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Freelance application schema
export const freelanceApplications = pgTable("freelance_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  specialty: text("specialty").notNull(),
  experienceYears: text("experience_years").notNull(),
  skills: text("skills").notNull(),
  portfolioUrl: text("portfolio_url"),
  linkedinUrl: text("linkedin_url"),
  message: text("message").notNull(),
  applicationType: text("application_type").notNull(), // "individual" or "agency"
  companyName: text("company_name"), // Only for agency applications
  createdAt: text("created_at").notNull(),
});

export const freelanceFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  specialty: z.string().min(2, { message: "Specialty must be at least 2 characters" }),
  experienceYears: z.string().min(1, { message: "Years of experience is required" }),
  skills: z.string().min(5, { message: "Skills must be at least 5 characters" }),
  portfolioUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  linkedinUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  applicationType: z.enum(["individual", "agency"], { 
    message: "Application type must be either 'individual' or 'agency'" 
  }),
  companyName: z.string().optional(),
});

export const insertFreelanceApplicationSchema = createInsertSchema(freelanceApplications).pick({
  name: true,
  email: true,
  phone: true,
  specialty: true,
  experienceYears: true,
  skills: true,
  portfolioUrl: true,
  linkedinUrl: true,
  message: true,
  applicationType: true,
  companyName: true,
});

export type InsertFreelanceApplication = z.infer<typeof insertFreelanceApplicationSchema>;
export type FreelanceApplication = typeof freelanceApplications.$inferSelect;

// Job application schema
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  position: text("position").notNull(),
  cvFileName: text("cv_file_name").notNull(),
  cvFileContent: text("cv_file_content").notNull(), // Base64 encoded file content
  coverLetterFileName: text("cover_letter_file_name"),
  coverLetterFileContent: text("cover_letter_file_content"), // Base64 encoded file content
  message: text("message"),
  createdAt: text("created_at").notNull(),
});

const maxFileSize = 5 * 1024 * 1024; // 5MB

export const jobApplicationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  position: z.string().min(2, { message: "Position must be at least 2 characters" }),
  cvFile: z.object({
    name: z.string(),
    content: z.string(), // Base64 encoded content
    size: z.number().max(maxFileSize, { message: "CV file must be less than 5MB" })
  }),
  coverLetterFile: z.object({
    name: z.string(),
    content: z.string(), // Base64 encoded content
    size: z.number().max(maxFileSize, { message: "Cover letter file must be less than 5MB" })
  }).optional(),
  message: z.string().optional(),
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).pick({
  name: true,
  email: true,
  phone: true,
  position: true,
  cvFileName: true,
  cvFileContent: true,
  coverLetterFileName: true,
  coverLetterFileContent: true,
  message: true,
});

export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type JobApplication = typeof jobApplications.$inferSelect;
