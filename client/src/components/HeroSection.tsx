import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-100 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Next-Generation IT Solutions for Your Business
            </h1>
            <p className="text-xl text-gray-500 mb-8">
              We deliver cutting-edge technology services to help your organization thrive in the digital era.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                asChild
              >
                <a href="#services">Our Services</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="IT Solutions" 
              className="rounded-lg shadow-xl w-full h-auto" 
              width="600" 
              height="400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
