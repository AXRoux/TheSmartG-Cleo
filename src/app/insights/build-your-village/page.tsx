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
            The saying "it takes a village" applies to more than just raising children. Building a meaningful life, 
            growing a business, or pursuing any significant goal requires a community of people who believe in you 
            and support your journey.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Professional Village</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Your professional village includes mentors, peers, collaborators, and even competitors who push you 
            to be better. These relationships provide opportunities, feedback, and perspective you can't get alone.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Personal Village</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Your personal village includes family, friends, and chosen family who support you through life's ups 
            and downs. These are the people who celebrate your wins and help you navigate challenges.
          </p>

          <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
            <li>Invest in relationships before you need them</li>
            <li>Be the support you want to receive</li>
            <li>Quality over quantity in your inner circle</li>
            <li>Show up consistently, not just during crises</li>
            <li>Express gratitude for your village regularly</li>
          </ul>

          <p className="text-gray-700 leading-relaxed">
            Your village is your foundation. Invest in it, nurture it, and watch how it transforms every area of your life.
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
