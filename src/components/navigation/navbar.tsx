"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const openEmail = () => {
    window.location.href = "mailto:cleo@thesmartg.com";
    setIsMenuOpen(false);
  };

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", action: () => scrollToSection("hero") },
    { name: "About", action: () => scrollToSection("about-tsg") },
    { name: "Services", action: () => scrollToSection("services") },
    { name: "Insights", action: () => scrollToSection("live-learn-hub") },
    { name: "Contact", action: openEmail }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
              <Image
                src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQlsDvobKBmqbis4MSfAvgpRXu7CVQ09Wc51xO"
                alt="The Smart Group Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="text-white/80 hover:text-white font-body text-sm font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center">
            <Button 
              size="sm"
              onClick={handleAuthButtonClick}
              className="bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30 font-body font-medium transition-all duration-200 shadow-lg backdrop-blur-sm px-6"
            >
              {isAuthenticated ? "Dashboard" : "Login"}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-white/80 transition-colors duration-200 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="px-2 pt-2 pb-6 space-y-1 bg-black/40 backdrop-blur-sm rounded-lg mt-2 border border-white/10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 font-body text-sm font-medium transition-all duration-200 rounded-md"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 mt-4">
              <Button 
                size="sm"
                onClick={handleAuthButtonClick}
                className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30 font-body font-medium backdrop-blur-sm"
              >
                {isAuthenticated ? "Dashboard" : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};