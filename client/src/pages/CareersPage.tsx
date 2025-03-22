import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, BadgeCheck, Check } from "lucide-react"; 
import Layout from "@/components/Layout";
import PageNavigation from "@/components/PageNavigation";
import { JobApplicationFormValues, jobApplicationFormSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Briefcase,  Upload } from "lucide-react";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";


const navigationLinks = [
  { id: "positions", label: "Open Positions" },
  { id: "culture", label: "Our Culture" },
  { id: "process", label: "Hiring Process" },
  { id: "perks", label: "Benefits & Perks" },
];

function useActiveSection(sections: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return activeSection;
}

// Sample job listings
const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    location: "Remote (EU Timezone)",
    type: "Full-time",
    description: "We're looking for an experienced frontend developer skilled in React, TypeScript, and modern frontend architectures to join our growing team.",
    responsibilities: [
      "Develop high-quality, responsive user interfaces using React",
      "Collaborate with designers and backend engineers to implement new features",
      "Optimize application performance and user experience",
      "Participate in code reviews and contribute to technical decisions"
    ],
    requirements: [
      "5+ years of frontend development experience",
      "Strong proficiency in React, TypeScript, and modern JavaScript",
      "Experience with state management solutions (Redux, Context API)",
      "Knowledge of responsive design and cross-browser compatibility",
      "Excellent problem-solving and communication skills"
    ]
  },
  {
    id: 2,
    title: "Backend Engineer",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Join our backend team to build scalable, reliable services that power our applications. We're looking for engineers with Node.js expertise.",
    responsibilities: [
      "Design and implement RESTful APIs and microservices",
      "Integrate with databases and third-party services",
      "Improve application performance and reliability",
      "Write unit and integration tests"
    ],
    requirements: [
      "3+ years of backend development experience",
      "Strong proficiency in Node.js and Express",
      "Experience with SQL and NoSQL databases",
      "Knowledge of API design and security best practices",
      "Familiarity with containerization and cloud services"
    ]
  },
  {
    id: 3,
    title: "DevOps Engineer",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Help us build and maintain our cloud infrastructure and deployment pipelines to ensure reliable, scalable operations.",
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure on AWS/Azure",
      "Monitor system performance and troubleshoot issues",
      "Implement security best practices and automation"
    ],
    requirements: [
      "3+ years of DevOps experience",
      "Proficiency with Docker, Kubernetes, and container orchestration",
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Knowledge of monitoring tools and logging solutions",
      "Strong scripting skills (Bash, Python)"
    ]
  }
];

export default function CareersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const { toast } = useToast();
  const activeSection = useActiveSection(navigationLinks.map(link => link.id));

  const hiringSteps = [
    {
      title: "Application Review",
      description: "Our team reviews your application, CV, and cover letter"
    },
    {
      title: "Initial Interview",
      description: "Virtual meeting to discuss your experience and aspirations"
    },
    {
      title: "Technical Assessment",
      description: "Skills evaluation through practical tasks or coding challenges"
    },
    {
      title: "Final Interview",
      description: "Meet with the team leaders and discuss potential role"
    },
    {
      title: "Offer & Onboarding",
      description: "Welcome to the team! Begin your journey with us"
    }
  ];

  const benefitsList = [
    {
      title: "Health & Wellness",
      items: ["Comprehensive health insurance", "Mental health support", "Wellness programs"]
    },
    {
      title: "Work-Life Balance",
      items: ["Flexible working hours", "Remote work options", "Paid time off"]
    },
    {
      title: "Growth & Development",
      items: ["Professional training", "Conference allowance", "Career mentorship"]
    },
    {
      title: "Financial Benefits",
      items: ["Competitive salary", "Performance bonuses", "401(k) matching"]
    }
  ];

  const form = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      message: "",
    },
  });

  const handleCvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "CV file must be less than 5MB",
          variant: "destructive",
        });
        event.target.value = "";
        setCvFile(null);
        return;
      }
      setCvFile(file);
    }
  };

  const handleCoverLetterFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Cover letter file must be less than 5MB",
          variant: "destructive",
        });
        event.target.value = "";
        setCoverLetterFile(null);
        return;
      }
      setCoverLetterFile(file);
    }
  };

  const handleJobSelect = (jobId: number) => {
    setSelectedJob(jobId);
    const job = jobListings.find(job => job.id === jobId);
    if (job) {
      form.setValue("position", job.title);
    }
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Extract the base64 part from the data URL
        const base64String = result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  // Form submission handler
  const onSubmit = async (data: JobApplicationFormValues) => {
    if (!cvFile) {
      toast({
        title: "CV Required",
        description: "Please upload your CV/resume",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert files to base64
      const cvBase64 = await fileToBase64(cvFile);
      let coverLetterBase64 = null;

      if (coverLetterFile) {
        coverLetterBase64 = await fileToBase64(coverLetterFile);
      }

      // Prepare submission data
      const submissionData = {
        ...data,
        cvFile: {
          name: cvFile.name,
          content: cvBase64,
          size: cvFile.size
        },
        coverLetterFile: coverLetterFile ? {
          name: coverLetterFile.name,
          content: coverLetterBase64,
          size: coverLetterFile.size
        } : null
      };

      // Submit to API
      await apiRequest(
        "POST",
        "/api/jobs/apply",
        submissionData
      );

      toast({
        title: "Application Submitted",
        description: "Your job application has been successfully submitted. We'll review it and contact you soon!",
        variant: "default",
      });

      // Reset form and file inputs
      form.reset();
      setCvFile(null);
      setCoverLetterFile(null);
      setSelectedJob(null);
      // Reset file input elements
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
          input.value = "";
        }
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <PageNavigation links={navigationLinks} activeSection={activeSection} />

      <section id="hiring-process" className="bg-gray-50 py-16 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Hiring Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {hiringSteps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-primary font-bold text-xl mb-2">Step {index + 1}</div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefitsList.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 space-y-10">
        <div className="space-y-5 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Join Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover exciting career opportunities at BetaPreZbenya and become part of a team that's shaping the future of technology
          </p>
        </div>

        <Separator className="my-8" />

        <div className="space-y-8" id="positions">
          <h2 className="text-2xl font-bold">Current Openings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobListings.map((job) => (
              <Card
                key={job.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedJob === job.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleJobSelect(job.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription className="mt-1">{job.location} • {job.type}</CardDescription>
                    </div>
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{job.description}</p>
                  <Button
                    variant={selectedJob === job.id ? "default" : "outline"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJobSelect(job.id);
                      // Scroll to application form
                      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {selectedJob === job.id ? "Selected" : "Apply Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedJob && (
          <div className="space-y-6 p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-bold">
              {jobListings.find(job => job.id === selectedJob)?.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold">Responsibilities:</h4>
                <ul className="space-y-2">
                  {jobListings.find(job => job.id === selectedJob)?.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Requirements:</h4>
                <ul className="space-y-2">
                  {jobListings.find(job => job.id === selectedJob)?.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <Separator className="my-8" />

        <div id="application-form" className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Apply Now</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Ready to take the next step in your career? Fill out the application form below to apply for one of our open positions or submit a general application.
          </p>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Job Application</CardTitle>
              <CardDescription>
                Complete the form below and upload your CV to apply
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="name@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 123 456 7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={selectedJob ? `${jobListings.find(job => job.id === selectedJob)?.title}` : "Enter position or select from above"}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Choose a position above or enter another role you're interested in
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <div>
                      <FormLabel className="block mb-2">CV/Resume (Required)</FormLabel>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCvFileChange}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        {cvFile && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Accepted formats: PDF, DOC, DOCX (Max 5MB)
                      </p>
                      {!cvFile && (
                        <div className="text-red-500 text-sm mt-1">
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            <span>CV/Resume is required</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <FormLabel className="block mb-2">Cover Letter (Optional)</FormLabel>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCoverLetterFileChange}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        {coverLetterFile && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Accepted formats: PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us why you're interested in this position or any additional information you'd like to share..."
                            className="min-h-[120px]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <AlertCircle className="h-4 w-4" />
                    <p>All information provided will be kept confidential</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !cvFile}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="space-y-8" id="culture">
          <h2 className="text-2xl font-bold text-center">Why Join BetaPreZbenya?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Professional Growth</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  We invest in your development through continuous learning opportunities, mentorship programs, and career advancement paths.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Innovative Environment</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Work on cutting-edge projects using the latest technologies and best practices in the industry.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Work-Life Balance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  We value your well-being with flexible work arrangements, competitive benefits, and a supportive company culture.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}