import Layout from "@/components/Layout";
import TeamSection from "@/components/TeamSection";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Divider } from "@/components/ui/divider";
import { Linkedin, Twitter, Github, Mail, ArrowRight } from "lucide-react";

export default function TeamPage() {
  const departmentLeads = [
    {
      name: "David Wilson",
      role: "Head of Software Development",
      bio: "David has over 12 years of experience in software architecture and leads our development team with expertise in multiple programming languages and frameworks.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      socials: [
        { icon: <Linkedin className="h-5 w-5" />, url: "#" },
        { icon: <Github className="h-5 w-5" />, url: "#" },
        { icon: <Mail className="h-5 w-5" />, url: "#" }
      ],
      expertise: ["Software Architecture", "System Design", "Team Leadership", "Agile Methodologies"]
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Security Operations",
      bio: "Elena brings a decade of cybersecurity expertise from her background in financial services security operations, ensuring our clients' systems remain protected from emerging threats.",
      image: "https://images.unsplash.com/photo-1573496528579-b78db5629cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      socials: [
        { icon: <Linkedin className="h-5 w-5" />, url: "#" },
        { icon: <Twitter className="h-5 w-5" />, url: "#" },
        { icon: <Mail className="h-5 w-5" />, url: "#" }
      ],
      expertise: ["Threat Intelligence", "Security Auditing", "Compliance", "Incident Response"]
    },
    {
      name: "Marcus Chen",
      role: "Cloud Solutions Architect",
      bio: "Marcus specializes in designing scalable cloud infrastructure solutions and has successfully led numerous complex migration projects for enterprise clients.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      socials: [
        { icon: <Linkedin className="h-5 w-5" />, url: "#" },
        { icon: <Github className="h-5 w-5" />, url: "#" },
        { icon: <Mail className="h-5 w-5" />, url: "#" }
      ],
      expertise: ["AWS & Azure Architecture", "Containerization", "Serverless Computing", "DevOps"]
    }
  ];

  const testimonials = [
    {
      quote: "The team at BetaPreZbenya has been instrumental in our digital transformation journey. Their expertise and dedication made all the difference.",
      author: "Sarah Johnson",
      title: "CTO, Global Retail Inc."
    },
    {
      quote: "Working with their security team has significantly strengthened our cybersecurity posture. They're responsive, knowledgeable, and truly care about protecting our business.",
      author: "Michael Thompson",
      title: "IT Director, Financial Services Ltd."
    },
    {
      quote: "Their cloud migration expertise saved us countless hours and resources. The team's technical knowledge and problem-solving abilities are outstanding.",
      author: "Jennifer Wu",
      title: "VP of Technology, Healthcare Solutions"
    }
  ];

  return (
    <Layout>
      <TeamSection />
      
      {/* Department Leaders */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Department Leaders</h2>
            <Divider className="bg-primary mx-auto mb-6" />
            <p className="text-gray-500 max-w-3xl mx-auto">
              Meet the experienced leaders who guide our specialized departments and ensure excellence in everything we do.
            </p>
          </div>
          
          <div className="space-y-16">
            {departmentLeads.map((leader, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center bg-white rounded-lg shadow-lg p-8`}
              >
                <div className="lg:w-1/3">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="rounded-lg w-full h-auto object-cover shadow-md"
                    style={{ height: '400px' }}
                  />
                </div>
                <div className="lg:w-2/3">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-primary font-medium mb-4">{leader.role}</p>
                  <p className="text-gray-500 mb-6">{leader.bio}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Areas of Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((skill, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    {leader.socials.map((social, idx) => (
                      <a 
                        key={idx} 
                        href={social.url} 
                        className="text-gray-500 hover:text-primary transition-all"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Clients Say About Our Team</h2>
            <Divider className="bg-primary mx-auto mb-6" />
            <p className="text-gray-300 max-w-3xl mx-auto">
              Hear from our clients about their experiences working with our team of experts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-lg border border-gray-700 relative">
                <div className="text-5xl text-primary opacity-20 absolute top-4 left-4">"</div>
                <p className="text-gray-300 mb-6 relative z-10">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contact">
                Work With Our Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Careers Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <Divider className="bg-primary mx-auto mb-6" />
            <p className="text-gray-500 mb-8">
              We're always looking for talented individuals who are passionate about technology and innovation. Explore opportunities to grow your career with BetaPreZbenya.
            </p>
            <Button asChild>
              <Link href="/contact">
                View Open Positions
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}