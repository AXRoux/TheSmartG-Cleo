"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BuildYourVillagePage() {
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
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
              Community
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
            Build Your Village
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Why a strong support system is your greatest professional and personal asset.
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQrOwmPLKM2KSysEvGtQwp78iBWF1dh3ngeYHq"
            alt="Build your village"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            What does your village say about you? Or maybe your village is so big, you actually have a tribe. In life and in business, our support systems have the power to save us, make us, or break us. Too often, we overlook the importance of working collectively and supporting each other in ways that allow all of us to succeed.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            This is true not just in our personal lives, but in our professional ones too. Those worlds often become deeply intertwined. Colleagues become family. But are we building villages that truly allow us to be the best version of ourselves? What if we focused on building and maintaining relationships? What if we built villages that fight for us and with us for the long haul?
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            This week’s thought is a question: Are the people you surround yourself with daily the right people? Are those you seek advice from sound in their thinking? Are you being intentional in the relationships you nurture?
          </p>

          <p className="text-gray-700 leading-relaxed">
            This week, find someone you admire. Send them an email, say hello, take them to lunch. Build a village that protects, uplifts, and stands with you.
          </p>
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
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
                  <span>203 views</span>
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
