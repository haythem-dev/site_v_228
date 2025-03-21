import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Award, Clock, Shield, CheckCircle2 } from "lucide-react";
import { Divider } from "@/components/ui/divider";

export default function Home() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure Solutions",
      description: "Enterprise-grade security measures to protect your valuable business data and infrastructure."
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-green-500" />,
      title: "Quality Assurance",
      description: "Rigorous testing methodologies ensure reliable and high-performing solutions."
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-500" />,
      title: "24/7 Support",
      description: "Round-the-clock technical support and maintenance services for your peace of mind."
    },
    {
      icon: <Award className="h-10 w-10 text-yellow-500" />,
      title: "Certified Experts",
      description: "Team of industry-certified professionals with extensive experience across IT domains."
    }
  ];

  return (
    <Layout>
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <Divider className="bg-primary mx-auto mb-6" />
            <p className="text-gray-500 max-w-3xl mx-auto">
              BetaPreZbenya delivers exceptional IT solutions backed by expertise, quality, and dedication to your success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-center">
                <div className="mx-auto mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business with cutting-edge IT solutions?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Our team of experts is ready to help you navigate the digital landscape and achieve your technology goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/contact">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
