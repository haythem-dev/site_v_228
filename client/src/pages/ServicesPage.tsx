import Layout from "@/components/Layout";
import ServicesSection from "@/components/ServicesSection";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Divider } from "@/components/ui/divider";
import { Check, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  const serviceDetails = [
    {
      id: "software-development",
      title: "Software Development",
      description: "Our expert developers create custom software solutions tailored to your specific business requirements.",
      imageUrl: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      features: [
        "Custom web application development",
        "Mobile app development (iOS & Android)",
        "Enterprise software solutions",
        "E-commerce platforms",
        "API development and integration",
        "Legacy system modernization"
      ]
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      description: "Protect your business with our comprehensive security solutions designed to identify and mitigate risks.",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      features: [
        "Security audits and assessments",
        "Penetration testing",
        "Security monitoring and incident response",
        "Data protection and encryption",
        "Employee security training",
        "Compliance consulting (GDPR, HIPAA, etc.)"
      ]
    },
    {
      id: "cloud-services",
      title: "Cloud Services",
      description: "Leverage the power of cloud computing to scale your business and optimize operational efficiency.",
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      features: [
        "Cloud migration strategy and execution",
        "Multi-cloud architecture design",
        "Cloud infrastructure management",
        "Serverless application development",
        "Cost optimization",
        "24/7 cloud monitoring and support"
      ]
    }
  ];

  return (
    <Layout>
      <ServicesSection />
      
      {/* Detailed Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Service Details</h2>
            <Divider className="bg-primary mx-auto mb-6" />
            <p className="text-gray-500 max-w-3xl mx-auto">
              Explore our comprehensive range of IT services designed to help your business innovate and grow in today's digital landscape.
            </p>
          </div>
          
          <div className="space-y-24">
            {serviceDetails.map((service, index) => (
              <div 
                key={service.id} 
                id={service.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
              >
                <div className="lg:w-1/2">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="rounded-lg shadow-xl w-full h-auto object-cover"
                    style={{ height: '400px' }}
                  />
                </div>
                <div className="lg:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-500 mb-6">{service.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-1">
                          <Check className="h-5 w-5" />
                        </div>
                        <p className="ml-3 text-gray-600">{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button asChild>
                    <Link href="/contact">
                      Request Service <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Service Process</h2>
            <Divider className="bg-primary mx-auto mb-6" />
            <p className="text-gray-500 max-w-3xl mx-auto">
              We follow a systematic approach to ensure successful project delivery and client satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Discovery</h3>
              <p className="text-gray-500">
                We begin by thoroughly understanding your business needs, challenges, and goals through in-depth consultations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Strategy & Planning</h3>
              <p className="text-gray-500">
                Our team develops a comprehensive strategy and project roadmap tailored to your specific requirements.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Implementation</h3>
              <p className="text-gray-500">
                We execute the plan using agile methodologies, ensuring regular updates and flexibility to adapt as needed.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">4</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Testing & Quality Assurance</h3>
              <p className="text-gray-500">
                Rigorous testing and quality checks ensure your solution meets the highest standards of performance and reliability.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">5</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Deployment</h3>
              <p className="text-gray-500">
                We carefully manage the deployment process to ensure a smooth transition with minimal disruption to your operations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">6</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Ongoing Support</h3>
              <p className="text-gray-500">
                Our relationship continues with comprehensive support, maintenance, and optimization services to maximize your ROI.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}