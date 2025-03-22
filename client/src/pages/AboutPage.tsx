import Layout from "@/components/Layout";
import AboutSection from "@/components/AboutSection";
import { Divider } from "@/components/ui/divider";
import { Badge } from "@/components/ui/badge";
import { Trophy, Heart, Users, Target, Clock, Zap } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "200+", label: "Projects Completed" },
    { value: "50+", label: "Team Members" },
    { value: "98%", label: "Client Satisfaction" }
  ];

  const milestones = [
    {
      year: "2008",
      title: "Company Founded",
      description: "Zbenya Systems was established with a vision to provide innovative IT solutions to businesses."
    },
    {
      year: "2012",
      title: "Expansion Phase",
      description: "Expanded service offerings and opened a second office to serve more clients across the region."
    },
    {
      year: "2015",
      title: "Digital Transformation",
      description: "Launched specialized services focused on helping traditional businesses embrace digital transformation."
    },
    {
      year: "2019",
      title: "Global Reach",
      description: "Expanded operations internationally with clients in over 10 countries."
    },
    {
      year: "2022",
      title: "Innovation Hub",
      description: "Established a dedicated R&D department focused on emerging technologies like AI and blockchain."
    }
  ];

  return (
    <Layout>
      <AboutSection />
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Company History */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <Divider className="bg-primary mx-auto mb-6" />
            <p className="text-gray-500 max-w-3xl mx-auto">
              The story of Zbenya Systems is one of innovation, growth, and commitment to excellence in the IT industry.
            </p>
          </div>
          
          <div className="relative border-l border-gray-200 ml-3 md:ml-6 pl-6 md:pl-12 py-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="mb-12 relative">
                <div className="absolute -left-10 md:-left-14 top-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <Clock className="h-4 w-4" />
                </div>
                <Badge variant="outline" className="mb-2 text-primary border-primary">
                  {milestone.year}
                </Badge>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                <p className="text-gray-500">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Principles</h2>
            <Divider className="bg-primary mx-auto mb-6" />
            <p className="text-gray-500 max-w-3xl mx-auto">
              These fundamental principles guide how we work, make decisions, and deliver value to our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-primary mb-4">
                <Trophy className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-500">
                We pursue excellence in everything we do, from code quality to customer service, setting the highest standards for ourselves.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-green-500 mb-4">
                <Heart className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-500">
                Our team is driven by a genuine passion for technology and problem-solving, bringing enthusiasm to every project.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-blue-500 mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-500">
                We believe in the power of teamwork, working closely with our clients to achieve shared goals and success.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-500 mb-4">
                <Target className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Client Focus</h3>
              <p className="text-gray-500">
                Our clients' success is our priority. We develop solutions tailored to their specific needs and challenges.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-indigo-500 mb-4">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-500">
                We embrace emerging technologies and creative thinking to deliver innovative solutions that give our clients a competitive edge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}