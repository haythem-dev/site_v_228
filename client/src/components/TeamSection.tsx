import { Linkedin, Twitter, Github, Facebook, Instagram } from "lucide-react";
import { Divider } from "./ui/divider";
import { useResponsive } from '../hooks/use-responsive';

const teamMembers = [
  {
    name: "Haythem Ben Abdelaziz",
    role: "CEO & Founder",
    bio: "A seasoned IT professional with extensive experience in software engineering and team leadership.",
    image: "../../../attached_assets/1737748242012.jpg",
    socials: [
      { icon: <Linkedin className="h-5 w-5" />, url: "https://www.linkedin.com/in/haythem-ben-abdelaziz-25a58b24" }
    ]
  },
  {
    name: "Technical Director",
    role: "CTO",
    bio: "Technical leadership and strategic direction",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60&blur=50",
    socials: [
      { icon: <Linkedin className="h-5 w-5" />, url: "#" },
      { icon: <Twitter className="h-5 w-5" />, url: "#" }
    ]
  },
  {
    name: "Development Lead",
    role: "Lead Developer",
    bio: "Technical development and solution architecture",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60&blur=50",
    socials: [
      { icon: <Linkedin className="h-5 w-5" />, url: "#" },
      { icon: <Github className="h-5 w-5" />, url: "#" }
    ]
  },
  {
    name: "Security Expert",
    role: "Security Specialist",
    bio: "Cybersecurity and system protection",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60&blur=50",
    socials: [
      { icon: <Linkedin className="h-5 w-5" />, url: "#" },
      { icon: <Twitter className="h-5 w-5" />, url: "#" }
    ]
  }
];

export default function TeamSection() {
  const { isMobile } = useResponsive(); // Use custom hook

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
          <Divider className="bg-primary mx-auto mb-6" />
          <p className="text-gray-500 max-w-3xl mx-auto">
            Meet our team of experienced professionals dedicated to delivering exceptional IT solutions.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 ${isMobile ? 'grid-cols-1' : ''}`}> {/* Apply mobile layout */}
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover object-center"
                width={isMobile ? 200 : 300} // Adjust image width for mobile
                height={isMobile ? 200 : 300} // Adjust image height for mobile
                loading="lazy" // Optimize image loading
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


