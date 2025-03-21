import { Linkedin, Twitter, Github, Facebook, Instagram } from "lucide-react";
import { Divider } from "./ui/divider";

const teamMembers = [
  {
    name: "John Smith",
    role: "CEO & Founder",
    bio: "With over 15 years of experience in IT leadership, John brings vision and strategic direction to our team.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    socials: [
      { icon: <Linkedin className="h-5 w-5" />, url: "#" },
      { icon: <Twitter className="h-5 w-5" />, url: "#" }
    ]
  },
  {
    name: "Sarah Johnson",
    role: "CTO",
    bio: "Sarah leads our technical teams with her extensive expertise in emerging technologies and software architecture.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    socials: [
      { icon: <Linkedin className="h-5 w-5" />, url: "#" },
      { icon: <Twitter className="h-5 w-5" />, url: "#" }
    ]
  },
  {
    name: "Michael Chen",
    role: "Lead Developer",
    bio: "Michael excels in developing innovative solutions for complex technical challenges across various platforms.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    socials: [
      { icon: <Linkedin className="h-5 w-5" />, url: "#" },
      { icon: <Github className="h-5 w-5" />, url: "#" }
    ]
  },
  {
    name: "Emily Rodriguez",
    role: "Security Specialist",
    bio: "Emily ensures our clients' systems remain secure with her expertise in cybersecurity and threat prevention.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    socials: [
      { icon: <Linkedin className="h-5 w-5" />, url: "#" },
      { icon: <Twitter className="h-5 w-5" />, url: "#" }
    ]
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
          <Divider className="bg-primary mx-auto mb-6" />
          <p className="text-gray-500 max-w-3xl mx-auto">
            Meet our team of experienced professionals dedicated to delivering exceptional IT solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover object-center" 
                width="300" 
                height="300"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex space-x-3">
                  {member.socials.map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.url} 
                      className="text-gray-500 hover:text-primary transition-all"
                      aria-label={`${member.name}'s social media`}
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
  );
}
