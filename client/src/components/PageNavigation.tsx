import React from 'react';
import { cn } from '@/lib/utils';

interface NavigationLink {
  id: string;
  label: string;
}

interface PageNavigationProps {
  links: NavigationLink[];
  activeSection?: string;
}

export default function PageNavigation({ links, activeSection }: PageNavigationProps) {
  return (
    <div className="sticky top-20 w-full bg-background/95 backdrop-blur z-40 border-b">
      <div className="container overflow-auto">
        <div className="flex items-center justify-start gap-4 py-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap py-2 border-b-2 border-transparent",
                activeSection === link.id && "text-primary border-primary"
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(link.id);
                if (element) {
                  element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}