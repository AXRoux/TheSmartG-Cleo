'use client';

import { useState, useEffect } from 'react';

export const AboutTSG = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Lead with Purpose",
      description: "Every strategy we develop is rooted in your organization's core mission and values, ensuring authentic and sustainable outcomes that create lasting impact.",
      imageUrl: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQK1qPxlwRHh7Oy8gIwzW2V1ABkj06dCTZbSLu",
      badge: "STEP 1",
      color: "bg-emerald-500"
    },
    {
      id: 2,
      title: "Work with Heart",
      description: "We believe that meaningful work comes from genuine partnerships built on trust, empathy, and shared commitment to transformational success.",
      imageUrl: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQxsLNDaTPJbnGcyT25t7dWv9LCf4sMZhKmUlA", 
      badge: "STEP 2",
      color: "bg-rose-500"
    },
    {
      id: 3,
      title: "Deliver with Excellence",
      description: "Our commitment to excellence means exceeding expectations through meticulous attention to detail, innovative problem-solving, and unwavering quality standards.",
      imageUrl: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQizaQ4I5TSjc3q0kpWBxNUQfEFag98HRw5Cob",
      badge: "STEP 3", 
      color: "bg-amber-500"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about-tsg" className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/6 w-64 h-64 bg-blue-50/20 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto max-w-7xl">
        {/* Main Title with Hero-style Treatment */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 text-xs font-medium tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
              Who We Are
            </span>
          </div>
          <h2 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-8"
            style={{
              letterSpacing: '-0.02em'
            }}
          >
            <span className="text-blue-500">About</span>{" "}
            <span className="text-black">TSG</span>
          </h2>
          
          {/* Hero-style Description */}
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-body mb-12">
            Transforming complex business challenges into{" "}
            <span className="text-black font-semibold">strategic opportunities</span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 lg:gap-16 mb-20 lg:mb-24">
          {/* Description Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl md:text-2xl text-black leading-relaxed font-body mb-8">
                A multidisciplinary team of strategists, communicators, creatives, and problem-solvers. We bring deep local insight with a global mindset, grounded by a commitment to excellence, authenticity, and sustainable impact.
              </p>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-body">
                At TSG, we are not just problem-solvers, we are partners. Our work is grounded in purpose, powered by people, and designed to make an impact that lasts. We don't just show up to check boxes, we show up to create change.
              </p>
            </div>
          </div>
        </div>

        {/* Slideshow Section */}
        <div className="space-y-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-display text-black mb-6">Our Core Values</h3>
            <p className="text-lg md:text-xl text-gray-600 font-body max-w-3xl mx-auto">
              Discover the areas where you should enhance your strategic approach through our proven methodology
            </p>
          </div>

          {/* Main Slideshow Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Large 16:9 Card */}
            <div className="relative w-full bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slides[currentSlide].imageUrl}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Overlay - Positioned like reference image */}
              <div className="absolute inset-0 flex items-center justify-between p-8 md:p-12 lg:p-16">
                {/* Left Side - Main Content */}
                <div className="flex-1 max-w-2xl">
                  <div className="mb-6">
                    <span className={`inline-block px-4 py-2 text-sm font-semibold text-white rounded-full ${slides[currentSlide].color}`}>
                      {slides[currentSlide].badge}
                    </span>
                  </div>
                  
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-6 leading-tight">
                    {slides[currentSlide].title}
                  </h4>
                  
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed font-body max-w-xl">
                    {slides[currentSlide].description}
                  </p>

                  {/* Testimonial Style Quote (inspired by reference) */}
                  <div className="mt-8 p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{slides[currentSlide].id}</span>
                      </div>
                      <div>
                        <p className="text-white/95 text-sm md:text-base italic leading-relaxed">
                          "This approach has been transformational for our organization's strategic direction and long-term success."
                        </p>
                        <div className="mt-3">
                          <div className="text-white font-semibold text-sm">Strategic Partner</div>
                          <div className="text-white/70 text-xs">Implementation Success Story</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Value Indicators (like reference image) */}
                <div className="hidden lg:block ml-8">
                  <div className="space-y-4">
                    {slides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className={`flex items-center space-x-3 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                          currentSlide === index
                            ? 'bg-white/20 border-white/30 text-white'
                            : 'bg-black/10 border-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      >
                        <div className={`w-3 h-3 rounded-full ${slide.color.replace('bg-', 'bg-opacity-100 ')}`}></div>
                        <span className="text-sm font-medium whitespace-nowrap">{slide.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Mobile Value Indicators */}
            <div className="lg:hidden mt-8 grid grid-cols-3 gap-4">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-blue-50 border-blue-200 text-blue-800'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${slide.color}`}></div>
                  <span className="text-sm font-medium">{slide.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}