"use client";

import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Eye, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Id } from '../../../../convex/_generated/dataModel';

export default function InsightDetailPage() {
  const params = useParams();
  const insightId = params.id as string;

  // Fetch the specific insight
  const insight = useQuery(api.insights.getInsightById, { 
    id: insightId as Id<"insights"> 
  });

  // Helper function to format content for display
  const formatContent = (text: string) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-900">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-gray-900 pl-6 italic text-gray-700 my-6 text-xl font-medium">
            {formatInlineText(line.substring(2))}
          </blockquote>
        );
      } else if (line.startsWith('• ')) {
        elements.push(
          <li key={index} className="ml-4 mb-3 text-lg leading-relaxed">
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
        elements.push(<div key={index} className="mb-4" />);
      }
    });
    
    return <div>{elements}</div>;
  };

  // Helper function to format inline text (bold, italic)
  const formatInlineText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*|\*(.*?)\*/g);
    return parts.map((part, index) => {
      if (index % 3 === 1) {
        return <strong key={index} className="font-bold">{part}</strong>;
      } else if (index % 3 === 2) {
        return <em key={index} className="italic">{part}</em>;
      }
      return part;
    });
  };

  if (insight === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Loading insight...</p>
        </div>
      </div>
    );
  }

  if (insight === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Insight Not Found</h1>
          <p className="text-gray-600 mb-6">The insight you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    "Personal Growth": "bg-emerald-100 text-emerald-800",
    "Wellness": "bg-blue-100 text-blue-800",
    "Leadership": "bg-purple-100 text-purple-800",
    "Community": "bg-orange-100 text-orange-800",
    "Purpose": "bg-pink-100 text-pink-800",
    "Mindset": "bg-indigo-100 text-indigo-800"
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
        {/* Featured Image */}
        {insight.featuredImage && (
          <div className="mb-8">
            <img
              src={insight.featuredImage}
              alt={insight.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <Badge 
              className={`${categoryColors[insight.category] || 'bg-gray-100 text-gray-800'} text-sm font-medium`}
            >
              {insight.category}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">
            {insight.title}
          </h1>

          {/* Excerpt */}
          {insight.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {insight.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{insight.authorName || insight.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(insight.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            {insight.readTime && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Time to read: {insight.readTime}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {insight.tags && insight.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {insight.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <div className="text-gray-800 leading-relaxed">
            {formatContent(insight.content)}
          </div>
        </div>

        {/* Author Section */}
        <div className="border-t border-gray-200 pt-12 mt-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{insight.authorName || insight.author}</h3>
              <p className="text-gray-600">{insight.authorBio || "Entrepreneur and advocate for personal growth."}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Published by <span className="font-medium text-gray-900">{insight.authorName || insight.author}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Last updated: {new Date(insight.updatedAt).toLocaleDateString()}
              </p>
            </div>
            
            <Link href="/#live-learn-hub">
              <Button variant="outline">
                View More Insights
              </Button>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
