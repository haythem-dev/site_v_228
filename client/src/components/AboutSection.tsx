import { Check } from "lucide-react";
import { Divider } from "./ui/divider";

export default function AboutSection() {
  const values = [
    {
      title: "Innovation",
      description: "We continuously seek new technologies and methods to deliver superior solutions."
    },
    {
      title: "Excellence",
      description: "We are committed to delivering high-quality solutions that exceed expectations."
    },
    {
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and ethical practices."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <Divider className="bg-primary mx-auto" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Our Team" 
              className="rounded-lg shadow-lg w-full h-auto" 
              width="600" 
              height="400"
            />
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-500 mb-6">
              At Zbenya Systems, we're committed to providing innovative IT solutions that empower businesses to reach their full potential. Our mission is to bridge the gap between technology and business needs, creating customized solutions that drive growth and efficiency.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-500 mt-1">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">{value.title}</h4>
                    <p className="text-gray-500">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
