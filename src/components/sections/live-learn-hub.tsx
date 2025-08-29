"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Insight {
  id: number | string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime?: string;
  authorBio?: string;
  image: string;
  link?: string;
}

// Keep the original insights with their existing links
const originalInsights: Insight[] = [
  {
    id: 1,
    category: "Personal Growth",
    title: "Boundaries Protect Your Peace",
    description: "Why setting and keeping healthy boundaries is an act of self-protection, not distance.",
    author: "Cleopatra Russell",
    date: "July 2025",
    image: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQsiHW4xpcOrx6KXupv5ZENylIGkanFQiPw2s9",
    link: "/insights/boundaries-protect-your-peace"
  },
  {
    id: 2,
    category: "Wellness",
    title: "Learn to be Present",
    description: "Productivity is great, but presence is priceless—here's your reminder to slow down.",
    author: "Cleopatra Russell",
    date: "July 2025",
    image: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQmo9MqmM8byt1wOxRQoEUX8uzgsABqFG96iYr",
    link: "/insights/learn-to-be-present"
  },
  {
    id: 3,
    category: "Leadership",
    title: "Accountability & Action!",
    description: "Owning your missteps is hard—but action is where accountability lives.",
    author: "Cleopatra Russell",
    date: "July 2025",
    image: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQLCbILUHYnVdzv2MFHq43opBNQbR0lUy9js8L",
    link: "/insights/accountability-action"
  },
  {
    id: 4,
    category: "Community",
    title: "Build Your Village",
    description: "Why a strong support system is your greatest professional and personal asset.",
    author: "Cleopatra Russell",
    date: "July 2025",
    image: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQrOwmPLKM2KSysEvGtQwp78iBWF1dh3ngeYHq",
    link: "/insights/build-your-village"
  },
  {
    id: 5,
    category: "Purpose",
    title: "What Do You Care About?",
    description: "A reflection on impact, presence, and showing up for the least of these.",
    author: "Cleopatra Russell",
    date: "July 2025",
    image: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQHtkgVWhZbaKmj6XTviqYn3AUxPCIFuwO9p1o",
    link: "/insights/what-do-you-care-about"
  },
  {
    id: 6,
    category: "Mindset",
    title: "You Can't Fix Everything!",
    description: "A PR pro's lesson in patience when control is impossible.",
    author: "Cleopatra Russell",
    date: "July 2025",
    image: "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQ4D0SQebotgHOUk27uTqIec6lyVrpdhA9K5aZ",
    link: "/insights/you-cant-fix-everything"
  }
];

const categoryColors = {
  "Personal Growth": "bg-emerald-100 text-emerald-800",
  "Wellness": "bg-blue-100 text-blue-800",
  "Leadership": "bg-purple-100 text-purple-800",
  "Community": "bg-orange-100 text-orange-800",
  "Purpose": "bg-pink-100 text-pink-800",
  "Mindset": "bg-indigo-100 text-indigo-800"
};

export const LiveLearnHub = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Fetch published insights from Convex
  const convexInsights = useQuery(api.insights.getInsights, { 
    status: "published", 
    limit: 20 
  });

  // Generate slug from title if not available
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Combine original insights with new ones from Convex
  const allInsights = useMemo(() => {
    const newInsights: Insight[] = convexInsights?.map(insight => {
      // Use existing slug or generate one from title
      const slug = insight.slug || generateSlug(insight.title);
      
      return {
        id: insight._id,
        category: insight.category,
        title: insight.title,
        description: insight.excerpt,
        author: insight.authorName || insight.author,
        date: new Date(insight.createdAt).toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        }),
        readTime: insight.readTime || "3 min",
        authorBio: insight.authorBio || "Entrepreneur and advocate for personal growth.",
        image: insight.featuredImage || "https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQsiHW4xpcOrx6KXupv5ZENylIGkanFQiPw2s9",
        link: `/insights/${slug}`
      };
    }) || [];

    // Add read time and author bio to original insights for consistency
    const enhancedOriginalInsights = originalInsights.map(insight => ({
      ...insight,
      readTime: "3 min", // Default read time for original insights
      authorBio: "Entrepreneur and advocate for personal growth."
    }));

    // Combine enhanced original insights first, then new ones from database
    return [...enhancedOriginalInsights, ...newInsights];
  }, [convexInsights]);

  // Only show first 10 insights in thumbnail navigation
  const displayedThumbnails = allInsights.slice(0, 10);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allInsights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allInsights.length) % allInsights.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentInsight = allInsights[currentSlide];

  // Function to get the link URL for each insight
  const getInsightLink = (insight: Insight) => {
    return insight.link || "#";
  };

  // Don't render if no insights are available
  if (!currentInsight) {
    return (
      <section id="live-learn-hub" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-white" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="text-center">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
              Live & Learn Hub
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Loading insights...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="live-learn-hub" className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-white" />
      
      <div className="relative z-10 container mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
            Live & Learn Hub
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A running feed of insights, lessons learned, and strategic takeaways from our journey.
          </p>
        </div>

        {/* Main Slideshow */}
        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden bg-white shadow-2xl border-0">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Image Section */}
              <div className="relative overflow-hidden bg-gray-900">
                <img
                  src={currentInsight.image}
                  alt={currentInsight.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 group"
                >
                  <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 group"
                >
                  <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Category Badge */}
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryColors[currentInsight.category as keyof typeof categoryColors]}`}>
                    {currentInsight.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-3xl lg:text-4xl text-gray-900 leading-tight">
                    {currentInsight.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {currentInsight.description}
                  </p>

                  {/* Author & Date */}
                  <div className="text-sm text-gray-500 space-y-1">
                    <p className="font-medium">{currentInsight.author}</p>
                    <div className="flex items-center gap-2">
                      <p>{currentInsight.date}</p>
                      {currentInsight.readTime && (
                        <>
                          <span>•</span>
                          <p>Time to read: {currentInsight.readTime}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    {getInsightLink(currentInsight) !== "#" ? (
                      <Link href={getInsightLink(currentInsight)}>
                        <Button 
                          size="lg" 
                          className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                        >
                          Read Full Insight
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        size="lg" 
                        className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                        disabled
                      >
                        Read Full Insight
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Thumbnail Navigation - Only show first 10 */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              {displayedThumbnails.map((insight, index) => (
                <button
                  key={insight.id}
                  onClick={() => goToSlide(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    currentSlide === index 
                      ? 'ring-3 ring-gray-900 scale-110' 
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover"
                  />
                  {currentSlide === index && (
                    <div className="absolute inset-0 bg-gray-900/20" />
                  )}
                </button>
              ))}
              {/* Show indicator if there are more insights beyond 10 */}
              {allInsights.length > 10 && (
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300">
                  <span className="text-xs text-gray-500 font-medium">+{allInsights.length - 10}</span>
                </div>
              )}
            </div>
          </div>

          {/* Explore All CTA - Updated to redirect to LinkedIn */}
          <div className="text-center mt-12">
            <a 
              href="https://www.linkedin.com/in/cleopatra-russell/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between bg-gray-900 hover:bg-gray-800 text-white rounded-full py-4 pl-6 pr-2 font-medium transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              <span>Explore All Insights</span>
              <div className="bg-white rounded-full p-2 ml-4 group-hover:bg-gray-100 transition-colors duration-300">
                <ArrowUpRight className="w-5 h-5 text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>
          </div>
        </div>

        {/* Slide Indicator Dots - Show all insights but limit visual space */}
        <div className="flex justify-center mt-8 space-x-2">
          {allInsights.slice(0, 10).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-gray-900 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
          {/* Show additional dots indicator if there are more insights */}
          {allInsights.length > 10 && (
            <>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};