"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AccountabilityActionPage() {
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
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
              Leadership
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
            Accountability & Action!
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Owning your missteps is hard—but action is where accountability lives.
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src="https://ph5fhfclo2.ufs.sh/f/bdXMin16JCrQLCbILUHYnVdzv2MFHq43opBNQbR0lUy9js8L"
            alt="Accountability and Action"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            This week, let’s talk about something we rarely lean into: true accountability.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Not responsibility. Accountability. There’s a difference. Responsibility is often assigned — a task, a role, a duty. But accountability is chosen. It comes from self-awareness. From the ability to look back and ask yourself honestly how your decisions, your actions, or your silence contributed to an outcome you may not be proud of.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            In business and in life, we love to celebrate the wins. The promotions. The breakthroughs. The high points.
            But when things fall apart, when relationships strain or results don’t come, when people are let down or we fail to show up, accountability gets real quiet. We hesitate to admit our role. We shift blame, retreat, or pretend it’s not that deep.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Most of my posts lately have come from lived experience, both personal and professional. Today’s message is deeply personal. 
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Over time, through painful lessons and honest conversations, I’ve learned that accountability is one of the hardest things to embrace. But it is also one of the most important. It means holding yourself to a standard that your clients, your family, and your friends deserve. And more than anything, it means refusing to stay stuck in your comfort zone.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Without self-awareness and discipline, we unintentionally create chaos. But with accountability and aligned action, we make room for healing, rebuilding, and growth.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Because action is where accountability lives. It’s not enough to recognize where you fell short. You have to move. You have to correct. You have to ask the hard questions, own the hard answers, and do the hard things.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            That won’t feel easy. It’s not supposed to.
            But outside of your comfort zone is where people feel safe with you. It’s where colleagues begin to trust you again.
            It’s where loved ones feel the love, not just hear it.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            So as we start this week, I’m challenging myself and I challenge you too:
          </p>

          <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
            <li>Be accountable. For what you did. For what you didn’t do.</li>
            <li>Extend grace, yes, but also take action.</li>
            <li>Fix what you can.</li>
            <li>Grow where you need to.</li>
            <li>Be better. Be honest.</li>
          </ul>

          <p className="text-gray-700 leading-relaxed">
            That’s how we lead. That’s how we connect.
            That’s how we become who we’re meant to be.
          </p>
        </div>

        {/* Author Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
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
                  <span>156 views</span>
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
