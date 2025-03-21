import express, { type Express, Request, Response } from "express";
import type { Server } from "http";
import { createServer } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
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
        // We don't return an error to the client if email fails
        // as the message was still saved in the database
      }
      
      // Return success response
      return res.status(201).json({
        message: "Contact message submitted successfully",
        data: newMessage,
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationError.toString(),
        });
      }
      
      // Handle other errors
      console.error("Error submitting contact message:", error);
      return res.status(500).json({
        message: "An error occurred while submitting your message. Please try again later.",
      });
    }
  });

  // Get all contact messages (for demonstration/admin purposes)
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

  const httpServer = createServer(app);
  return httpServer;
}
