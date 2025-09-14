"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LearnToBePresentPage() {
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
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              Wellness
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
            Learn to be Present
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Productivity is great, but presence is priceless—here's your reminder to slow down.
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQmo9MqmM8byt1wOxRQoEUX8uzgsABqFG96iYr"
            alt="Learn to be present"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            Be productive, but be present!
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            With a long holiday weekend ahead here in The Bahamas, I felt compelled to share a lesson that my first mentor and dearest friend has been teaching me for more than a decade. For years, I struggled to grasp its importance. She was often frustrated by that, but over the past 12 months, I’ve finally come to understand why it mattered so much.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            In our professional lives, it's easy to let our work become our identity. We strive for success, which is admirable, but is it sustainable? And what are we losing in the process?
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            I say this as a recovering workaholic. That mindset has cost me relationships that were far more valuable than the fires I was trying to put out, the tasks I rushed to complete, or the people I thought I needed to impress.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            So here’s my reminder to you: It’s good to be productive, but don’t forget to be present. Be present with the people who truly matter. The ones who will still matter when your professional title changes.
          </p>
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
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
                  <span>89 views</span>
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
