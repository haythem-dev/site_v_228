import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { freelanceFormSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

export default function FreelancePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Form with default values
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
    },
  });
  
  // Form submission handler
  const onSubmit = async (data: FreelanceFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest({
        url: "/api/freelance",
        method: "POST",
        body: data,
      });
      
      toast({
        title: "Application Submitted",
        description: "Your freelance application has been successfully submitted. We'll contact you soon!",
        variant: "default",
      });
      
      // Reset form
      form.reset();
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
  
  // Watching applicationType to conditionally show company name field
  const applicationType = form.watch("applicationType");

  return (
    <div className="container max-w-5xl py-12 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Freelance Applications</h1>
        <p className="text-xl text-muted-foreground">
          Join our network of skilled freelancers or propose talented professionals for collaboration
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left column - Freelancer benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Why Work With Us</CardTitle>
            <CardDescription>Benefits of joining BetaPreZbenya's freelancer network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Competitive Rates</h3>
              </div>
              <p className="text-muted-foreground text-sm pl-7">
                We offer competitive compensation packages based on your skills and experience
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Flexible Work Arrangements</h3>
              </div>
              <p className="text-muted-foreground text-sm pl-7">
                Work remotely at your own pace with flexible scheduling options
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Exciting Projects</h3>
              </div>
              <p className="text-muted-foreground text-sm pl-7">
                Work on challenging and innovative projects for a diverse client base
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Professional Growth</h3>
              </div>
              <p className="text-muted-foreground text-sm pl-7">
                Access to training, mentorship, and career advancement opportunities
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Long-term Relationships</h3>
              </div>
              <p className="text-muted-foreground text-sm pl-7">
                We value building long-term partnerships with talented professionals
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Right column - Application form */}
        <Card>
          <CardHeader>
            <CardTitle>Apply as a Freelancer</CardTitle>
            <CardDescription>
              Fill out the form below to submit your application or recommend a freelancer
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
                          <SelectItem value="individual">Individual Freelancer</SelectItem>
                          <SelectItem value="agency">Agency / Recommending a Freelancer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {field.value === "individual" 
                          ? "Apply directly as a freelancer to work with us"
                          : "Recommend a freelancer or apply as an agency"
                        }
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {applicationType === "agency" && (
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company/Agency Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your company name" 
                            {...field} 
                            value={field.value || ""} 
                          />
                        </FormControl>
                        <FormDescription>
                          The name of your company or agency
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {applicationType === "individual" ? "Full Name" : "Freelancer Name"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormDescription>
                        {applicationType === "individual" 
                          ? "Your full name"
                          : "The name of the freelancer you're recommending"
                        }
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
                        <Input placeholder="e.g., Web Development, UI/UX Design" {...field} />
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
                          <Input placeholder="e.g., React, Node.js, Python" {...field} />
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
                          : "Why should we work with this freelancer?"
                        }
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
      </div>
      
      <Separator className="my-10" />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold">What happens after I submit my application?</h3>
            <p className="text-muted-foreground text-sm">
              Our team will review your application and contact you within 5-7 business days to discuss potential opportunities.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">What types of freelancers are you looking for?</h3>
            <p className="text-muted-foreground text-sm">
              We work with a variety of IT professionals including developers, designers, project managers, QA specialists, and technical writers.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Do you offer remote work opportunities?</h3>
            <p className="text-muted-foreground text-sm">
              Yes, most of our freelance positions are remote, although some projects may require occasional on-site presence.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">How does the payment process work?</h3>
            <p className="text-muted-foreground text-sm">
              Payment terms vary depending on the project and are discussed during the contract negotiation phase. We typically offer hourly, weekly, or project-based compensation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}