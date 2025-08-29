"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function YouCantFixEverythingPage() {
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
            <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">
              Mindset
            </Badge>
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>July 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>4 min read</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            You Can't Fix Everything!
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            A PR pro's lesson in patience when control is impossible.
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQ4D0SQebotgHOUk27uTqIec6lyVrpdhA9K5aZ"
            alt="You can't fix everything"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            As someone who's spent years in PR and crisis management, I've learned one of the hardest lessons: 
            you can't fix everything. And trying to do so will only drain your energy and dilute your impact.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Illusion of Control</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            We live in a culture that tells us we should be able to solve every problem, manage every crisis, 
            and control every outcome. But some things are simply beyond our influence.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Focus Your Energy</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            When you accept that you can't fix everything, you free yourself to focus on what you can actually change. 
            This isn't giving up—it's strategic thinking.
          </p>

          <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
            <li>Identify what's within your control vs. what's not</li>
            <li>Channel your energy toward high-impact actions</li>
            <li>Practice letting go of outcomes you can't influence</li>
            <li>Focus on your response, not others' actions</li>
            <li>Find peace in doing your part well</li>
          </ul>

          <p className="text-gray-700 leading-relaxed">
            Sometimes the most powerful thing you can do is acknowledge what you can't fix and focus your 
            energy where it can make a real difference.
          </p>
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
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
                  <span>178 views</span>
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
