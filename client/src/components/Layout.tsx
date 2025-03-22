import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AnimatedBackground from './AnimatedBackground';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative bg-[#050b1f]">
      <AnimatedBackground />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}