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
            This week's post is dedicated to my daughter, niece & nephew, all of whom graduated this year, one from high school and two from primary school. I think about the opportunities they've been afforded, not just to survive, but to thrive. And it makes me reflect on what truly matters.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            So this week I ask, what do you care about that isn’t money or material?
            The other day I met a young man. It wasn’t the first time, I didn’t remember our previous interaction, but he remembered. He felt the need to let me know how I made him feel in a moment of despair. He said, “I’m not sure you remember me, but I want to thank you for how I felt during our last interaction. I felt seen, valued and appreciated, like I mattered.” That stayed with me.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            In a conversation with a close friend, we talked about our childhoods, the things we lacked, and how those experiences shaped who we are. We spoke about what we care about now, and how much of it comes from wanting to be what we at times didn’t have. We’re driven by the idea that if we can help just one young person feel less invisible, more capable, more valued, then we’ve done something meaningful.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            For me lately, impact isn’t about wealth or possessions. It’s about presence. It’s about showing up with your time, your energy, your expertise, and maybe even your money, to give someone a real fighting chance. Not just for our children or loved ones, but those who the Good Book calls “the least of these.” Because sometimes, what changes a life isn’t a handout or a headline. It’s a moment. A connection. A feeling that someone sees you and cares. So, as we wrap another school year and celebrate the children who were "successful", I challenge us to also be present for the ones who carry a void we might be able to fill.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Be awesome this week.
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
