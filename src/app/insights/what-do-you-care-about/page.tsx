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
        <header className="mb-8">
          <div className="space-y-6">
          {/* Category */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              Purpose
            </Badge>
            <span>•</span>
            <span>Articles</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            What Do You Care About?
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
              <span>Time to read: 4 min.</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            A reflection on impact, presence, and showing up for the least of these.
          </p>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          {/* Opening Question */}
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <p className="text-2xl font-medium text-gray-900 leading-relaxed">
              So this week I ask, what do you care about that isn't money or material?
            </p>
          </div>

          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Lately, impact isn't about wealth or possessions. It's about presence — showing up with your time, energy, expertise, and maybe even money, to give someone a real fighting chance.
          </p>

          {/* Key Message */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-8 my-12">
            <p className="text-2xl font-medium text-gray-900 leading-relaxed mb-4">
              Impact isn't about wealth or possessions.
            </p>
            <p className="text-2xl font-medium text-gray-900 leading-relaxed mb-4">
              It's about presence.
            </p>
            <p className="text-2xl font-medium text-gray-900 leading-relaxed">
              It's about showing up.
            </p>
          </div>

          {/* Section: The Currency of Care */}
          <div className="bg-gray-50 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Currency of Care</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              In a world that measures success by bank accounts and material acquisitions, we often forget the most valuable currency we possess: our ability to care deeply about something beyond ourselves.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              When you show up with your time, energy, and expertise, you're not just helping someone succeed — you're giving them the chance to believe in themselves again.
            </p>
          </div>

          {/* Section: Beyond Personal Gain */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Looking Beyond Personal Gain</h2>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            It's easy to get caught up in the pursuit of personal success. The next promotion, the bigger paycheck, the nicer house, the better car. These aren't inherently wrong, but they become empty when they're the only things that drive us.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            True fulfillment comes when we identify what moves us beyond our own immediate needs and desires. What cause makes you lose track of time? What injustice keeps you up at night? What opportunity to help others gets you excited to start your day?
          </p>

          <blockquote className="text-2xl font-medium text-gray-900 border-l-4 border-gray-900 pl-6 my-8 italic">
            "The most meaningful life is one lived in service to something greater than yourself."
          </blockquote>

          {/* Section: Different Ways to Show Up */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Different Ways to Show Up</h2>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Showing up doesn't always require grand gestures or massive financial contributions. Sometimes the most powerful impact comes from simply being present and available when someone needs you most.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Time</h3>
              <p className="text-gray-700 leading-relaxed">
                Mentoring someone who's just starting out. Volunteering for causes you believe in. Being fully present when someone needs to talk.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Energy</h3>
              <p className="text-gray-700 leading-relaxed">
                Advocating for someone who doesn't have a voice. Fighting for changes that benefit others. Being the person who lifts others up.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Expertise</h3>
              <p className="text-gray-700 leading-relaxed">
                Teaching skills that could change someone's career. Sharing knowledge that could prevent others from making your mistakes.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Platform</h3>
              <p className="text-gray-700 leading-relaxed">
                Using your influence to highlight important issues. Connecting people who need each other. Amplifying voices that deserve to be heard.
              </p>
            </div>
          </div>

          {/* Section: The Ripple Effect */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">The Ripple Effect of Caring</h2>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            When you invest in something beyond yourself, you create ripples that extend far beyond what you can see. The person you mentor today might mentor ten others tomorrow. The cause you support might create systemic change that benefits thousands.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              I've seen this ripple effect in my own life. Every time I've chosen to show up for someone else — whether through mentorship, advocacy, or simply being present during difficult times — I've received far more than I gave.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Not in material returns, but in purpose, connection, and the deep satisfaction that comes from knowing you've made a difference in someone's life.
            </p>
          </div>

          {/* Section: Finding Your Cause */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Discovering What Matters to You</h2>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            If you're not sure what you care about beyond material success, start by paying attention to what bothers you. What inequalities make you angry? What struggles do you see that others might overlook?
          </p>

          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Questions for Reflection:</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>What issues keep you up at night or fire you up during conversations?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>Who in your community could benefit from your unique skills or perspective?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>What problems have you overcome that others are still struggling with?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>When do you feel most fulfilled and energized in your work or life?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>What would you want to be remembered for beyond your professional achievements?</span>
              </li>
            </ul>
          </div>

          {/* Section: The Legacy We Leave */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">The Legacy We Leave</h2>
          
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Because at the end of our lives, we won't be remembered for what we accumulated, but for what we contributed. We won't be celebrated for what we hoarded, but for what we shared.
            </p>
            <p className="text-lg font-medium text-gray-900">
              Find what you care about. Then care about it enough to act.
            </p>
          </div>

          {/* Challenge */}
          <div className="bg-gray-50 rounded-lg p-8 my-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">This Week's Challenge</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              This week, I challenge you to identify what moves you beyond personal gain. What cause, person, or mission makes you want to invest your most precious resources — your time and energy?
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border-l-4 border-gray-900">
                <h4 className="font-bold text-gray-900 mb-2">Step 1: Identify</h4>
                <p className="text-gray-700">Write down three issues or causes that genuinely matter to you.</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border-l-4 border-gray-900">
                <h4 className="font-bold text-gray-900 mb-2">Step 2: Act</h4>
                <p className="text-gray-700">Choose one small action you can take this week to show up for one of these causes.</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border-l-4 border-gray-900">
                <h4 className="font-bold text-gray-900 mb-2">Step 3: Commit</h4>
                <p className="text-gray-700">Make a plan for how you'll continue showing up beyond this week.</p>
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-gray-700">
            Remember: your impact doesn't have to be massive to be meaningful. Sometimes the most powerful thing you can do is simply show up consistently for something that matters to you. The world needs your unique combination of skills, perspective, and passion. Don't keep it to yourself.
          </p>
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