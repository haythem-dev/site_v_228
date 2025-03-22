import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { freelanceFormSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import PageNavigation from "@/components/PageNavigation";
import Layout from '@/components/Layout';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type FreelanceFormValues = z.infer<typeof freelanceFormSchema>;

const navigationLinks = [
  { id: "intro", label: "Overview" },
  { id: "benefits", label: "Benefits" },
  { id: "application", label: "Application Form" },
  { id: "propose-work", label: "Propose Work" },
  { id: "faq", label: "FAQ" },
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

export default function FreelancePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const activeSection = useActiveSection(navigationLinks.map((link) => link.id));

  const form = useForm<FreelanceFormValues>({
    resolver: zodResolver(freelanceFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialty: "",
      experienceYears: "",
      skills: "",
      portfolioUrl: "",
      linkedinUrl: "",
      message: "",
      applicationType: "individual",
      companyName: "",
      projectDescription: ""
    },
  });

  const onSubmit = async (data: FreelanceFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/freelance", data);

      toast({
        title: "Application Submitted",
        description:
          "Your freelance application has been successfully submitted. We'll contact you soon!",
        variant: "default",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const applicationType = form.watch("applicationType");

  const proposeWorkSchema = z.object({
    companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
    contactName: z.string().min(2, { message: "Contact name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    projectDescription: z.string().min(10, { message: "Project description must be at least 10 characters" }),
  });

  const proposeForm = useForm({
    resolver: zodResolver(proposeWorkSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      projectDescription: "",
    },
  });

  const onProposeSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await apiRequest("/api/propose-work", { method: "POST", body: data });
      toast({
        title: "Success",
        description: "Your project proposal has been submitted successfully.",
      });
      proposeForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit project proposal. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <PageNavigation links={navigationLinks} activeSection={activeSection} />
      <div className="container py-8">
        <section id="intro">
          <h2 className="text-3xl font-bold mb-6">Overview</h2>
          <div className="space-y-5 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Freelance Applications</h1>
            <p className="text-xl text-muted-foreground">
              Join our network of skilled freelancers or propose talented
              professionals for collaboration
            </p>
          </div>
        </section>
        <section id="benefits">
          <h2 className="text-3xl font-bold mb-8">Benefits of Working With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card>
              <CardHeader>
                <CardTitle>Why Work With Us</CardTitle>
                <CardDescription>
                  Benefits of joining Zbenya Systems' freelancer network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold">Competitive Rates</h3>
                  </div>
                  <p className="text-muted-foreground text-sm pl-7">
                    We offer competitive compensation packages based on your
                    skills and experience
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold">Flexible Work Arrangements</h3>
                  </div>
                  <p className="text-muted-foreground text-sm pl-7">
                    Work remotely at your own pace with flexible scheduling
                    options
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold">Exciting Projects</h3>
                  </div>
                  <p className="text-muted-foreground text-sm pl-7">
                    Work on challenging and innovative projects for a diverse
                    client base
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold">Professional Growth</h3>
                  </div>
                  <p className="text-muted-foreground text-sm pl-7">
                    Access to training, mentorship, and career advancement
                    opportunities
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold">Long-term Relationships</h3>
                  </div>
                  <p className="text-muted-foreground text-sm pl-7">
                    We value building long-term partnerships with talented
                    professionals
                  </p>
                </div>
              </CardContent>
            </Card>
            <section id="application">
              <Card>
                <CardHeader>
                  <CardTitle>Apply as a Freelancer</CardTitle>
                  <CardDescription>
                    Fill out the form below to submit your application or
                    recommend a freelancer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="applicationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>I am applying as</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select application type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="individual">
                                  Individual Freelancer
                                </SelectItem>
                                <SelectItem value="agency">
                                  Agency / Recommending a Freelancer
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              {field.value === "individual"
                                ? "Apply directly as a freelancer to work with us"
                                : "Recommend a freelancer or apply as an agency"}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("applicationType") === "agency" && (
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <div className="space-y-2">
                        <h3 className="font-semibold">Project Proposal</h3>
                        <p className="text-sm text-muted-foreground">
                          If you have a specific project in mind, please provide details below:
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="projectDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Please describe your project requirements, timeline, and budget expectations"
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {applicationType === "individual"
                                ? "Full Name"
                                : "Freelancer Name"}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter full name" {...field} />
                            </FormControl>
                            <FormDescription>
                              {applicationType === "individual"
                                ? "Your full name"
                                : "The name of the freelancer you're recommending"}
                            </FormDescription>
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
                        name="specialty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Specialty</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Web Development, UI/UX Design"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Main area of expertise
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="experienceYears"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Years of Experience</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 5" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="skills"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Key Skills</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., React, Node.js, Python"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="portfolioUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio URL (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://yourportfolio.com"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormDescription>
                              Link to portfolio or work samples
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="linkedinUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn URL (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://linkedin.com/in/username"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {applicationType === "individual"
                                ? "Why do you want to work with us?"
                                : "Why should we work with this freelancer?"}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your experience and what makes you a good fit..."
                                className="min-h-[120px]"
                                {...field}
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

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </section>
          </div>
        </section>

        <section id="propose-work">
          <Card>
            <CardHeader>
              <CardTitle>Propose Work</CardTitle>
              <CardDescription>
                Have a project for us? Tell us about your requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...proposeForm}>
                <form onSubmit={proposeForm.handleSubmit(onProposeSubmit)} className="space-y-6">
                  <FormField
                    control={proposeForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={proposeForm.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={proposeForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={proposeForm.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your project requirements, timeline, and budget expectations"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Submit Proposal
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
        <section id="faq">
          <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold">
                What happens after I submit my application?
              </h3>
              <p className="text-muted-foreground text-sm">
                Our team will review your application and contact you within
                5-7 business days to discuss potential opportunities.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">
                What types of freelancers are you looking for?
              </h3>
              <p className="text-muted-foreground text-sm">
                We work with a variety of IT professionals including developers,
                designers, project managers, QA specialists, and technical
                writers.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">
                Do you offer remote work opportunities?
              </h3>
              <p className="text-muted-foreground text-sm">
                Yes, most of our freelance positions are remote, although some
                projects may require occasional on-site presence.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">How does the payment process work?</h3>
              <p className="text-muted-foreground text-sm">
                Payment terms vary depending on the project and are discussed
                during the contract negotiation phase. We typically offer
                hourly, weekly, or project-based compensation.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}