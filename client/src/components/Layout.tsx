import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AnimatedBackground from './AnimatedBackground';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

// Basic placeholder for AnimatedBackground component.  Replace with actual implementation.
const AnimatedBackground = () => <div style={{ backgroundColor: 'lightblue', height: '100vh' }}></div>;