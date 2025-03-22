import express, { type Express, Request, Response } from "express";
import type { Server } from "http";
import { createServer } from "http";
import { contactFormSchema, freelanceFormSchema, jobApplicationFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { storage } from "./storage";
import { sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);

      // Create contact message
      const newMessage = await storage.createContactMessage({
        ...validatedData,
        createdAt: new Date().toISOString(),
      });

      // Send email notification
      try {
        await sendContactEmail(newMessage);
        console.log("Email notification sent successfully");
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }

      return res.status(201).json({
        message: "Contact message submitted successfully",
        data: newMessage,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationError.toString(),
        });
      }

      console.error("Error submitting contact message:", error);
      return res.status(500).json({
        message: "An error occurred while submitting your message",
      });
    }
  });

  // Get all contact messages
  app.get("/api/contact", async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getAllContactMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({
        message: "An error occurred while fetching contact messages.",
      });
    }
  });

  // Freelance application submission route
  app.post("/api/freelance", async (req: Request, res: Response) => {
    try {
      const validatedData = freelanceFormSchema.parse(req.body);
      const newApplication = await storage.createFreelanceApplication({
        ...validatedData,
        createdAt: new Date().toISOString(),
      });

      return res.status(201).json({
        message: "Freelance application submitted successfully",
        data: newApplication,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationError.toString(),
        });
      }

      console.error("Error submitting freelance application:", error);
      return res.status(500).json({
        message: "An error occurred while submitting your application",
      });
    }
  });

  // Get all freelance applications
  app.get("/api/freelance", async (_req: Request, res: Response) => {
    try {
      const applications = await storage.getAllFreelanceApplications();
      return res.status(200).json(applications);
    } catch (error) {
      console.error("Error fetching freelance applications:", error);
      return res.status(500).json({
        message: "An error occurred while fetching freelance applications.",
      });
    }
  });

  // Job application submission route
  app.post("/api/jobs/apply", async (req: Request, res: Response) => {
    try {
      const validatedData = jobApplicationFormSchema.parse(req.body);
      const newApplication = await storage.createJobApplication({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        position: validatedData.position,
        cvFileName: validatedData.cvFile.name,
        cvFileContent: validatedData.cvFile.content,
        coverLetterFileName: validatedData.coverLetterFile?.name || null,
        coverLetterFileContent: validatedData.coverLetterFile?.content || null,
        message: validatedData.message || null,
        createdAt: new Date().toISOString(),
      });

      return res.status(201).json({
        message: "Job application submitted successfully",
        data: { id: newApplication.id, name: newApplication.name, email: newApplication.email },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationError.toString(),
        });
      }

      console.error("Error submitting job application:", error);
      return res.status(500).json({
        message: "An error occurred while submitting your application",
      });
    }
  });

  // Get all job applications
  app.get("/api/jobs/applications", async (_req: Request, res: Response) => {
    try {
      const applications = await storage.getAllJobApplications();
      const sanitizedApplications = applications.map(app => ({
        ...app,
        cvFileContent: "[File Content]",
        coverLetterFileContent: app.coverLetterFileContent ? "[File Content]" : null
      }));
      return res.status(200).json(sanitizedApplications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      return res.status(500).json({
        message: "An error occurred while fetching job applications.",
      });
    }
  });

  return createServer(app);
}