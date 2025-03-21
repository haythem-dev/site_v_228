import Layout from "@/components/Layout";
import ContactSection from "@/components/ContactSection";
import { Divider } from "@/components/ui/divider";
import { MapPin } from "lucide-react";

export default function ContactPage() {
  const faqItems = [
    {
      question: "What types of businesses do you work with?",
      answer: "We work with businesses of all sizes across various industries, from startups to established enterprises. Our solutions are customized to meet the specific needs and goals of each client, regardless of their size or sector."
    },
    {
      question: "How quickly can you start working on our project?",
      answer: "Our standard onboarding process typically takes 1-2 weeks, depending on the complexity of your project and our current workload. For urgent matters, we offer expedited services to accommodate time-sensitive needs."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer comprehensive support and maintenance packages to ensure your systems continue to operate efficiently after deployment. Our support team is available to address any issues that may arise and provide regular updates as needed."
    },
    {
      question: "What are your payment terms?",
      answer: "We offer flexible payment options tailored to your project's scope and duration. Typically, we work with a milestone-based payment schedule for larger projects, while smaller engagements may require a partial upfront payment with the remainder due upon completion."
    },
    {
      question: "Can you work with our existing IT team?",
      answer: "Absolutely! We excel at collaborating with in-house IT departments, providing specialized expertise and additional resources to complement your existing team. We can work in a consulting capacity or handle specific aspects of a project while integrating smoothly with your team."
    }
  ];

  return (
    <Layout>
      {/* Map Section */}
      <section className="h-[400px] relative">
        <div className="absolute inset-0 bg-gray-900/30 z-10 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Get In Touch</h1>
            <p className="text-gray-600">
              We're excited to hear from you! Use the contact form below or visit our office.
            </p>
          </div>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.42929269831!2d-122.4726194!3d37.7576793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1615928606684!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy"
          title="Office Location Map"
        ></iframe>
      </section>

      <ContactSection />
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <Divider className="bg-primary mx-auto mb-6" />
            <p className="text-gray-500 max-w-3xl mx-auto">
              Find answers to common questions about our services, process, and working with BetaPreZbenya.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto divide-y divide-gray-200">
            {faqItems.map((item, index) => (
              <div key={index} className="py-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-500">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}