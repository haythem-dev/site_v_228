import { Monitor, ShieldCheck, Cloud, Building, Network, Lightbulb } from "lucide-react";
import { Divider } from "./ui/divider";
import { Link } from "wouter";

const services = [
  {
    icon: <Monitor className="h-6 w-6" />,
    iconBg: "bg-blue-100",
    iconColor: "text-primary",
    title: "Software Development",
    description: "Custom software solutions tailored to your specific business needs, from web applications to enterprise systems.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your data, systems, and digital assets from threats and vulnerabilities.",
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-500",
    title: "Cloud Services",
    description: "Scalable cloud solutions that optimize your infrastructure, reduce costs, and enhance operational efficiency.",
  },
  {
    icon: <Building className="h-6 w-6" />,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    title: "IT Consulting",
    description: "Expert guidance on technology strategy, digital transformation, and IT infrastructure optimization.",
  },
  {
    icon: <Network className="h-6 w-6" />,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
    title: "Network Infrastructure",
    description: "Design, implementation, and management of reliable and high-performance network systems.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    title: "AI & Data Analytics",
    description: "Leverage artificial intelligence and data analytics to gain insights and make informed business decisions.",
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <Divider className="bg-primary mx-auto mb-6" />
          <p className="text-gray-500 max-w-3xl mx-auto">
            We offer a comprehensive range of IT solutions designed to address your unique business challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="p-6">
                <div className={`w-12 h-12 ${service.iconBg} rounded-lg flex items-center justify-center ${service.iconColor} mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 mb-4">
                  {service.description}
                </p>
                <Link href="/contact" className="text-primary font-medium hover:underline">Learn more →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
