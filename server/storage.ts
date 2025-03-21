import { 
  users, 
  type User, 
  type InsertUser, 
  type ContactMessage, 
  type InsertContactMessage,
  type FreelanceApplication,
  type InsertFreelanceApplication,
  type JobApplication,
  type InsertJobApplication
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations (keeping for reference)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form operations
  createContactMessage(message: InsertContactMessage & { createdAt: string }): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  
  // Freelance application operations
  createFreelanceApplication(application: InsertFreelanceApplication & { createdAt: string }): Promise<FreelanceApplication>;
  getAllFreelanceApplications(): Promise<FreelanceApplication[]>;
  getFreelanceApplicationById(id: number): Promise<FreelanceApplication | undefined>;
  
  // Job application operations
  createJobApplication(application: InsertJobApplication & { createdAt: string }): Promise<JobApplication>;
  getAllJobApplications(): Promise<JobApplication[]>;
  getJobApplicationById(id: number): Promise<JobApplication | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private freelanceApplications: Map<number, FreelanceApplication>;
  private jobApplications: Map<number, JobApplication>;
  
  private userIdCounter: number;
  private contactMessageIdCounter: number;
  private freelanceApplicationIdCounter: number;
  private jobApplicationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.freelanceApplications = new Map();
    this.jobApplications = new Map();
    
    this.userIdCounter = 1;
    this.contactMessageIdCounter = 1;
    this.freelanceApplicationIdCounter = 1;
    this.jobApplicationIdCounter = 1;
  }

  // User operations (keeping for reference)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact form operations
  async createContactMessage(insertMessage: InsertContactMessage & { createdAt: string }): Promise<ContactMessage> {
    const id = this.contactMessageIdCounter++;
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
  
  // Freelance application operations
  async createFreelanceApplication(insertApplication: InsertFreelanceApplication & { createdAt: string }): Promise<FreelanceApplication> {
    const id = this.freelanceApplicationIdCounter++;
    const application: FreelanceApplication = { 
      ...insertApplication, 
      id,
      portfolioUrl: insertApplication.portfolioUrl || null,
      linkedinUrl: insertApplication.linkedinUrl || null,
      companyName: insertApplication.companyName || null
    };
    this.freelanceApplications.set(id, application);
    return application;
  }
  
  async getAllFreelanceApplications(): Promise<FreelanceApplication[]> {
    return Array.from(this.freelanceApplications.values());
  }
  
  async getFreelanceApplicationById(id: number): Promise<FreelanceApplication | undefined> {
    return this.freelanceApplications.get(id);
  }
  
  // Job application operations
  async createJobApplication(insertApplication: InsertJobApplication & { createdAt: string }): Promise<JobApplication> {
    const id = this.jobApplicationIdCounter++;
    const application: JobApplication = { 
      ...insertApplication, 
      id,
      message: insertApplication.message || null,
      coverLetterFileName: insertApplication.coverLetterFileName || null,
      coverLetterFileContent: insertApplication.coverLetterFileContent || null
    };
    this.jobApplications.set(id, application);
    return application;
  }
  
  async getAllJobApplications(): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values());
  }
  
  async getJobApplicationById(id: number): Promise<JobApplication | undefined> {
    return this.jobApplications.get(id);
  }
}

export const storage = new MemStorage();
