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
        <header className="mb-8">
          <div className="space-y-6">
            {/* Category */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              Leadership
            </Badge>
            <span>•</span>
            <span>Articles</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Accountability & Action!
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
              <span>Time to read: 8 min.</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Owning your missteps is hard—but action is where accountability lives.
          </p>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          {/* Opening Quote */}
          <blockquote className="text-2xl font-medium text-gray-900 border-l-4 border-gray-900 pl-6 my-8 italic">
            "Action is where accountability lives."
          </blockquote>

          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              This week, let's talk about something we rarely lean into: <strong className="text-gray-900">true accountability</strong>. 
              Responsibility is often assigned — a task, a role, a duty. But accountability is chosen. It comes from 
              self-awareness and the ability to ask honestly how your choices contributed to an outcome you may not be proud of.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              We love to celebrate the wins, but when things fall apart, accountability gets real quiet. Through painful 
              lessons I've learned accountability is one of the hardest things to embrace — and one of the most important. 
              Because <strong className="text-gray-900">action is where accountability lives</strong>. Recognizing 
              where you fell short isn't enough. You have to move, correct, ask the hard questions, own the hard answers, 
              and do the hard things.
            </p>
          </div>

          {/* Responsibility vs. Accountability Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Responsibility vs. Accountability</h2>
          
          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Responsibility</h3>
              <p className="text-gray-700 leading-relaxed">
                External assignment. Given to you by others. Focused on tasks and duties. 
                Can be transferred or delegated. About what you're supposed to do.
              </p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-gray-900">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Accountability</h3>
              <p className="text-gray-700 leading-relaxed">
                Internal ownership. Chosen by you. Focused on outcomes and impact. 
                Cannot be transferred — it's yours. About what you actually did and its consequences.
              </p>
            </div>
          </div>

          {/* Leadership Accountability Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Leadership Demands Radical Ownership</h2>
          
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              As leaders, we don't get the luxury of pointing fingers. When our team fails, we fail. 
              When projects derail, we own the derailment. When culture becomes toxic, we examine 
              our role in creating that environment.
            </p>
            
            <blockquote className="border-l-4 border-gray-900 pl-6 py-4 my-6">
              <p className="text-xl italic text-gray-900">
                "The moment you blame others for your circumstances is the moment you give away your power to change them."
              </p>
            </blockquote>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              This doesn't mean taking blame for everything that goes wrong. It means honestly assessing 
              your contribution to every outcome — positive and negative — and using that awareness to 
              improve your leadership.
            </p>
          </div>

          {/* The Hard Questions Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Asking the Hard Questions</h2>
          
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              True accountability starts with brutal self-examination. These questions will make you uncomfortable — that's the point:
            </p>
            
            <div className="space-y-4">
              {[
                "What did I do (or fail to do) that contributed to this outcome?",
                "How did my communication, decisions, or actions influence this situation?",
                "What patterns in my behavior keep producing similar results?",
                "What feedback have I been ignoring or dismissing?",
                "How did my ego, fear, or assumptions cloud my judgment?",
                "What would I tell someone else to do if they were in my position?"
              ].map((question, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0" />
                  <p className="text-gray-700">{question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* From Recognition to Action Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Turning Recognition Into Action</h2>
          
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Recognition without action is just expensive therapy. The real work begins after you've 
              identified your role in the outcome. Here's how to bridge the gap between knowing and doing:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">1. Immediate</h4>
                <p className="text-gray-700">Take one concrete action within 24 hours that demonstrates your commitment to change.</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">2. Systematic</h4>
                <p className="text-gray-700">Create systems and processes that prevent the same mistakes from recurring.</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">3. Ongoing</h4>
                <p className="text-gray-700">Establish regular check-ins and feedback loops to monitor your progress.</p>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-gray-900 pl-6 py-4 my-6">
              <p className="text-xl italic text-gray-900">
                "Accountability isn't a one-time event — it's a daily practice of choosing ownership over excuses."
              </p>
            </blockquote>
          </div>

          {/* The Courage Component Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">The Courage Accountability Requires</h2>
          
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Let's be honest — accountability is terrifying. It requires admitting we're not perfect, 
              that our decisions have consequences, and that we have work to do. It demands:
            </p>
            
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-lg border-l-4 border-gray-900">
                <h4 className="text-xl font-bold text-gray-900 mb-3">The Courage to Be Vulnerable</h4>
                <p className="text-gray-700">Admitting mistakes, especially publicly, goes against every instinct to protect our image and ego.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg border-l-4 border-gray-900">
                <h4 className="text-xl font-bold text-gray-900 mb-3">The Courage to Face Consequences</h4>
                <p className="text-gray-700">True accountability means accepting the full weight of our choices, even when it's painful or costly.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg border-l-4 border-gray-900">
                <h4 className="text-xl font-bold text-gray-900 mb-3">The Courage to Change</h4>
                <p className="text-gray-700">Moving from recognition to action requires dismantling comfortable patterns and building new ones.</p>
              </div>
            </div>
          </div>

          {/* Practical Steps Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Your Accountability Action Plan</h2>
          
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900">This Week</h4>
                <ul className="space-y-3">
                  {[
                    "Identify one recent failure or disappointment",
                    "Ask yourself the hard questions listed above",
                    "Write down your honest answers",
                    "Choose one specific action to take immediately",
                    "Share your commitment with someone you trust"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-900 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900">This Month</h4>
                <ul className="space-y-3">
                  {[
                    "Establish a weekly self-review process",
                    "Create feedback loops with your team",
                    "Track patterns in your decision-making",
                    "Celebrate progress, not just perfection",
                    "Share lessons learned with others"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-900 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Closing Section */}
          <div className="bg-gray-50 rounded-lg p-8 my-12">
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Accountability isn't about beating yourself up for every mistake. It's about building the 
              muscle of ownership so you can create the outcomes you actually want. It's about becoming 
              the kind of leader who doesn't just talk about change — but embodies it.
            </p>
            
            <p className="text-lg italic text-gray-900 mb-6">
              The question isn't whether you'll make mistakes. The question is what you'll do with them 
              when you do. Will you hide, blame, and repeat? Or will you own, learn, and evolve?
            </p>
            
            <div className="border-t border-gray-200 pt-6">
              <p className="text-lg text-gray-700">
                <span className="font-bold text-gray-900">Remember:</span> Action is where accountability lives. 
                And action is where leaders are made.
              </p>
            </div>
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