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
        <header className="mb-8">
          <div className="space-y-6">
          {/* Category */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              Personal Growth
            </Badge>
            <span>•</span>
            <span>Articles</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Boundaries Protect Your Peace
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Cleopatra Russell</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>July 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Time to read: 3 min.</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Why setting and keeping healthy boundaries is an act of self-protection, not distance.
          </p>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          {/* Opening Quote */}
          <blockquote className="text-2xl font-medium text-gray-900 border-l-4 border-gray-900 pl-6 my-8 italic">
            "Familiarity breeds contempt."
          </blockquote>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            I heard that often growing up, but I didn't really understand it until I worked in an environment where people constantly disrespected the boundaries of others.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Now that I operate more as an entrepreneur and less as a corporate employee, I've come to value the importance of boundaries in every part of my life. Setting them, keeping them, and understanding that they aren't about being distant or difficult, they're about protection.
          </p>

          {/* Key Message */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-8 my-12">
            <p className="text-2xl font-medium text-gray-900 leading-relaxed mb-4">
              Boundaries protect your peace.
            </p>
            <p className="text-2xl font-medium text-gray-900 leading-relaxed mb-4">
              They protect your dignity.
            </p>
            <p className="text-2xl font-medium text-gray-900 leading-relaxed">
              They protect your emotional well-being.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Some people won't respect them. They'll test them, push past them, or act as if they don't exist. But just because someone wants access to something they are not entitled to, doesn't mean they deserve it.
          </p>

          {/* Call to Action */}
          <div className="bg-gray-50 rounded-lg p-8 my-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">This Week's Challenge</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Take a moment to check in with yourself. What do you need to stay happy, healthy, and productive? Start there. Create the boundaries that support that version of you.
            </p>
            <p className="text-lg font-medium text-gray-900">
              And keep them. You're worth protecting.
            </p>
          </div>
        </div>

        {/* Author Section */}
        <div className="border-t border-gray-200 pt-12 mt-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Cleopatra Russell</h3>
              <p className="text-gray-600">Entrepreneur and advocate for personal growth.</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}