"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export const MeetFounderSection = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setIsImageLoaded(true);
    img.src = "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQF5wnE9QayXTQlzjhL0U8PYcEFBpHZ4d17oNt";
  }, []);

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/30 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-50/15 rounded-full blur-3xl"></div>

      <div className="container relative mx-auto px-8 lg:px-16">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50/50 backdrop-blur-sm border border-blue-100/50 rounded-full mb-8 group hover:bg-blue-50 transition-all duration-300">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm tracking-wider uppercase text-gray-700 font-medium">Leadership</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Main Headline */}
            <div className="space-y-6">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-wide">
                Meet Our{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text">
                  Founder
                </span>
              </h2>
              
              {/* Quote */}
              <div className="relative">
                <div className="absolute -left-4 -top-2 text-6xl text-blue-200/60 font-display leading-none select-none">"</div>
                <blockquote className="pl-8 pr-4">
                  <p className="font-display text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed italic">
                    We are a collective of thinkers, planners, communicators, and doers who thrive in the details and stay focused on the why. Every project we touch is personal.
                  </p>
                </blockquote>
                <div className="absolute -right-4 -bottom-6 text-6xl text-blue-200/60 font-display leading-none select-none rotate-180">"</div>
              </div>
            </div>

            {/* Founder Info */}
            <div className="space-y-6 pt-8 border-t border-gray-200">
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-gray-900 mb-2 tracking-wide">
                  Cleopatra Russell
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 mb-6"></div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed font-body max-w-lg">
                Founded by Cleopatra Russell, The Smart Group is an extension of her values and commitment to creating meaningful change through strategic communication. Her vision drives our commitment to solutions that are smart, scalable, and socially conscious.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:order-last">
            <div className="relative group">
              {/* Image Container with Sophisticated Styling */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50/30 to-gray-50/30 p-1 group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-500">
                <div className="relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm">
                  {/* Loading State */}
                  {!isImageLoaded && (
                    <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-xl"></div>
                  )}
                  
                  {/* Main Image */}
                  <div className={`transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <Image
                      src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQF5wnE9QayXTQlzjhL0U8PYcEFBpHZ4d17oNt"
                      alt="Cleopatra Russell, Founder of The Smart Group"
                      width={600}
                      height={750}
                      className="w-full aspect-[4/5] object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                      priority
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  </div>
                  
                  {/* Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-xl"></div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100/30 rounded-full blur-xl group-hover:bg-blue-100/50 transition-colors duration-500"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-50/20 to-blue-100/20 rounded-full blur-2xl group-hover:from-blue-50/30 group-hover:to-blue-100/30 transition-colors duration-500"></div>
              
              {/* Geometric Accent */}
              <div className="absolute top-8 -right-4 w-20 h-20 border border-gray-200/60 rounded-2xl rotate-12 group-hover:rotate-6 transition-transform duration-500"></div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-20 pt-8 border-t border-gray-200">
          <div className="flex justify-center">
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};