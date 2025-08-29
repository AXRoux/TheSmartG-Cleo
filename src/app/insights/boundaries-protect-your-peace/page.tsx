"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BoundariesProtectYourPeacePage() {
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
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
              Personal Growth
            </Badge>
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>July 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>3 min read</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Boundaries Protect Your Peace
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Why setting and keeping healthy boundaries is an act of self-protection, not distance.
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQsiHW4xpcOrx6KXupv5ZENylIGkanFQiPw2s9"
            alt="Boundaries protect your peace"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            Setting boundaries isn't about building walls—it's about creating space for your peace to flourish. 
            In a world that constantly demands your attention, energy, and time, boundaries become your most 
            powerful tool for self-preservation.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Boundaries Matter</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Boundaries protect your peace by defining what you will and won't accept in your relationships, 
            work, and personal life. They're not about being distant or unkind—they're about being intentional 
            with your energy and creating space for what truly matters.
          </p>

          <blockquote className="border-l-4 border-emerald-500 pl-6 italic text-gray-600 my-8">
            "Boundaries are not walls. They are gates with consciously chosen entry points."
          </blockquote>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Set Healthy Boundaries</h2>
          
          <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
            <li>Start small and be consistent</li>
            <li>Communicate clearly and kindly</li>
            <li>Don't over-explain your decisions</li>
            <li>Practice saying no without guilt</li>
            <li>Remember: boundaries are for you, not others</li>
          </ul>

          <p className="text-gray-700 leading-relaxed">
            Your peace is worth protecting. Setting boundaries isn't selfish—it's necessary. When you protect 
            your peace, you show up better for the people and causes that matter most to you.
          </p>
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
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
                  <span>127 views</span>
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
