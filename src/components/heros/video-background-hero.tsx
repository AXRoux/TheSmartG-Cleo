"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navigation/navbar"
import { ArrowDown } from "lucide-react"

export default function VideoBackgroundHero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openEmail = () => {
    window.location.href = "mailto:cleo@thesmartg.com";
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      <section id="hero" className="relative min-h-screen overflow-hidden bg-background">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQ8QfjFXeidGSYEVmvlntLbaIKrwqkf57O3UBZ"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        
        {/* Gradient Overlay - More sophisticated overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        
        {/* Main Content Grid */}
        <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Content Area */}
          <div className="lg:col-span-8 xl:col-span-7 px-4 sm:px-6 lg:px-12 xl:px-16 pt-32 sm:pt-36 lg:pt-24 xl:pt-16">
            {/* Brand/Tagline */}
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-3 py-1.5 text-xs font-medium tracking-widest text-white/80 uppercase bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                Innovation · Excellence · Results
              </span>
            </div>

            {/* Main Headline - Reduced sizes for better responsiveness */}
            <h1 
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white leading-[1.1] mb-6 sm:mb-8"
              style={{
                textShadow: '0 0 60px rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.8)',
                letterSpacing: '-0.02em'
              }}
            >
              We specialize in{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                  turning complexity
                </span>
                <span className="absolute inset-0 blur-sm bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent opacity-50"></span>
              </span>
              {" "}into clarity and making the{" "}
              <span className="italic text-white/95">impossible achievable.</span>
            </h1>
            
            {/* Supporting Text - Reduced size */}
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 max-w-xl lg:max-w-2xl leading-relaxed font-body">
              Transform your challenges into opportunities with our innovative 
              solutions and expert guidance. We deliver results that matter.
            </p>
            
            {/* CTA Buttons - Enhanced Design */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Button 
                size="lg" 
                onClick={openEmail}
                className="px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold bg-white text-black hover:bg-gray-100 shadow-2xl hover:shadow-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-xl"
              >
                Get Started Today
              </Button>
              <Button 
                size="lg" 
                onClick={() => scrollToSection("services")}
                className="px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold bg-black text-white hover:bg-gray-900 border-2 border-black hover:border-gray-900 shadow-xl hover:shadow-black/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-xl"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content Area - Subtle accent */}
          <div className="lg:col-span-4 xl:col-span-5 hidden lg:flex items-center justify-center px-12">
            <div className="w-px h-64 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </section>
    </>
  )
}