"use client";

import Link from 'next/link';
import { VideoText } from '@/components/magicui/video-text';

export const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openEmail = () => {
    window.location.href = "mailto:cleo@thesmartg.com";
  };

  const navItems = [
    { label: "Home", action: () => scrollToSection("hero") },
    { label: "About", action: () => scrollToSection("about-tsg") },
    { label: "Services", action: () => scrollToSection("services") },
    { label: "Insights", action: () => scrollToSection("live-learn-hub") },
    { label: "Contact", action: openEmail }
  ];

  return (
    <footer className="relative bg-white text-black">
      {/* Clean horizontal separator line */}
      <div className="w-full h-px bg-black/20"></div>

      <div className="relative z-10">
        {/* Navigation Section - Further reduced padding */}
        <div className="px-6 pt-6 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col space-y-4">
              <div className="text-left">
                <span className="text-sm font-medium tracking-wider uppercase opacity-80">NAV</span>
              </div>
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="text-xl md:text-2xl font-light tracking-wide hover:opacity-80 transition-opacity duration-200 w-fit text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Video Text Section - Reduced height for thinner footer */}
        <div className="px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <div className="relative h-[120px] md:h-[160px] lg:h-[200px] w-full overflow-hidden">
                <VideoText 
                  src="https://cdn.magicui.design/ocean-small.webm" 
                  className="w-full h-full text-4xl md:text-6xl lg:text-7xl font-bold"
                >
                  THE SMART GROUP
                </VideoText>
              </div>
            </div>
          </div>
        </div>

        {/* Made with love in The Bahamas - Repositioned closer */}
        <div className="absolute bottom-3 right-6">
          <div className="text-right">
            <div className="text-sm font-medium tracking-wider opacity-80">
              Made with ❤️ in The Bahamas
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};