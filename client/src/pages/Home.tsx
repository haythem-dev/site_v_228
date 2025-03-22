
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Divider } from "@/components/ui/divider";

export default function Home() {
  return (
    <Layout>
      <section className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-6">Welcome to Zbenya Systems</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Next-Generation IT Solutions for Your Business
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/contact">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
