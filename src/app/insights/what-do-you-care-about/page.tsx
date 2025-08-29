"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WhatDoYouCareAboutPage() {
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
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              Purpose
            </Badge>
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>July 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            What Do You Care About?
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            A reflection on impact, presence, and showing up for the least of these.
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQHtkgVWhZbaKmj6XTviqYn3AUxPCIFuwO9p1o"
            alt="What do you care about"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            In a world full of noise, it's easy to lose sight of what truly matters. We get caught up in the urgent 
            and forget the important. We chase metrics and miss meaning.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Finding Your Why</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            What you care about shapes every decision you make. It determines where you spend your time, 
            energy, and resources. It defines your legacy.
          </p>

          <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 my-8">
            "The question isn't who is going to let me; it's who is going to stop me." - Ayn Rand
          </blockquote>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Showing Up for Others</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Your values become real when you act on them. When you show up for "the least of these"—
            those who can't offer you anything in return—you discover what you truly care about.
          </p>

          <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
            <li>Identify your core values through your actions, not your words</li>
            <li>Look for opportunities to serve without recognition</li>
            <li>Align your daily choices with your deeper purpose</li>
            <li>Ask yourself: "What would I do if no one was watching?"</li>
          </ul>

          <p className="text-gray-700 leading-relaxed">
            What you care about is revealed not in what you say, but in what you do when no one is looking.
          </p>
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Cleopatra Russell
              </h3>
              <p className="text-gray-600">
                Entrepreneur and advocate for personal growth
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Published July 2025</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>312 views</span>
                </div>
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
