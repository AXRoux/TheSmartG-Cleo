"use client";

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Eye, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from 'react';

export default function InsightDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  // Helper function to format content for display
  const formatContent = (text: string) => {
    if (!text) return <p className="text-gray-700">No content available.</p>;
    
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-3xl font-bold mt-8 mb-4 text-gray-900">{line.substring(3)}</h2>);
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-4xl font-bold mt-8 mb-6 text-gray-900">{line.substring(2)}</h1>);
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-blue-500 pl-6 italic text-gray-700 my-6 text-xl bg-gray-50 py-4 rounded-r-lg">
            {formatInlineText(line.substring(2))}
          </blockquote>
        );
      } else if (line.startsWith('• ')) {
        elements.push(
          <li key={index} className="ml-4 mb-2 text-lg leading-relaxed text-gray-700 list-disc">
            {formatInlineText(line.substring(2))}
          </li>
        );
      } else if (line.trim()) {
        elements.push(
          <p key={index} className="mb-6 leading-relaxed text-lg text-gray-700">
            {formatInlineText(line)}
          </p>
        );
      } else {
        elements.push(<br key={index} />);
      }
    });
    
    return <div>{elements}</div>;
  };

  // Helper function to format inline text (bold, italic)
  const formatInlineText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*|\*(.*?)\*/g);
    return parts.map((part, index) => {
      if (index % 3 === 1) {
        return <strong key={index} className="font-bold text-gray-900">{part}</strong>;
      } else if (index % 3 === 2) {
        return <em key={index} className="italic text-gray-800">{part}</em>;
      }
      return part;
    });
  };
  
  // Static insights that have their own pages - redirect to them
  const staticInsights = [
    "boundaries-protect-your-peace",
    "learn-to-be-present", 
    "accountability-action",
    "build-your-village",
    "what-do-you-care-about",
    "you-cant-fix-everything"
  ];
  
  useEffect(() => {
    if (staticInsights.includes(slug)) {
      router.push(`/insights/${slug}`);
    }
  }, [router, slug]);
  
  // If this is a static insight, don't render anything while redirecting
  if (staticInsights.includes(slug)) {
    return null;
  }
  
  // Get insight by slug with error handling
  const insight = useQuery(api.insights.getInsightBySlug, { slug });

  // Loading state
  if (insight === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading insight...</p>
        </div>
      </div>
    );
  }

  // Handle case where insight is not found
  if (insight === null || !insight) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Insight Not Found</h1>
          <p className="text-gray-600 mb-6">The insight you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    "Personal Growth": "bg-emerald-100 text-emerald-800",
    "Wellness": "bg-purple-100 text-purple-800", 
    "Leadership": "bg-amber-100 text-amber-800",
    "Community": "bg-red-100 text-red-800",
    "Purpose": "bg-blue-100 text-blue-800",
    "Mindset": "bg-pink-100 text-pink-800"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">Published Insight</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Badge className={categoryColors[insight.category] || "bg-gray-100 text-gray-800"}>
              {insight.category}
            </Badge>
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(insight.publishedAt || insight.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{insight.readTime}</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {insight.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {insight.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {insight.featuredImage && (
          <div className="mb-12">
            <img 
              src={insight.featuredImage}
              alt={insight.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-blockquote:text-gray-700 prose-li:text-gray-700">
          {formatContent(insight.content)}
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {insight.authorName || insight.author}
              </h3>
              <p className="text-gray-600">
                {insight.authorBio || "Writer and thought leader"}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Published {new Date(insight.publishedAt || insight.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                {insight.viewCount > 0 && (
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{insight.viewCount} views</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-center">
            <Link href="/#live-learn-hub">
              <Button 
                variant="default" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                View More Insights
              </Button>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
