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
        <header className="mb-8">
          <div className="space-y-6">
          {/* Category */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              Community
            </Badge>
            <span>•</span>
            <span>Articles</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Build Your Village
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
            Why a strong support system is your greatest professional and personal asset.
          </p>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          {/* Opening Statement */}
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            What does your village say about you? In life and business, our support systems can save us, make us, or break us.
          </p>

          {/* Key Message */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-8 my-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Power of Your Circle</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              We often underestimate how profoundly our inner circle shapes our thinking, our opportunities, and our outcomes. The people we surround ourselves with don't just influence what we do—they influence who we become.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Your village is more than a network. It's your compass, your safety net, and your growth catalyst all in one.
            </p>
          </div>

          {/* Section: What Makes a Strong Village */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">What Makes a Strong Village?</h2>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            A strong village isn't built on convenience or proximity—it's built on intention. The best support systems share certain characteristics that make them invaluable during both triumph and struggle.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">They Challenge You</h3>
              <p className="text-gray-700 leading-relaxed">
                True allies don't just agree with everything you say. They ask tough questions, offer different perspectives, and help you see blind spots you might miss on your own.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">They Celebrate You</h3>
              <p className="text-gray-700 leading-relaxed">
                Your village genuinely celebrates your wins without competition or jealousy. They understand that your success doesn't diminish theirs.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">They Support You</h3>
              <p className="text-gray-700 leading-relaxed">
                When things get tough, they show up. Not just with words, but with actions, time, and tangible help when you need it most.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">They Inspire You</h3>
              <p className="text-gray-700 leading-relaxed">
                Being around them makes you want to be better. Their energy, ambition, and character raise your own standards and aspirations.
              </p>
            </div>
          </div>

          {/* Section: Professional vs Personal Village */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Building Both Professional and Personal Villages</h2>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            The most resilient people don't rely on a single support system. They cultivate different types of relationships that serve different needs and contexts.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Professional Village Should Include:</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Mentors:</strong> People who've walked the path before you and can offer wisdom and guidance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Peers:</strong> Those at similar stages who understand your current challenges and can collaborate with you.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Champions:</strong> People who believe in your potential and actively advocate for your opportunities.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Mentees:</strong> Those you're helping grow, who keep you sharp and connected to fresh perspectives.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Personal Village Should Include:</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Anchors:</strong> People who knew you before success, who keep you grounded and authentic.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Truth-tellers:</strong> Friends who will call you out when you're wrong and hold you accountable.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Joy-bringers:</strong> People who make you laugh, help you relax, and remind you not to take yourself too seriously.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Safe havens:</strong> Those you can be completely vulnerable with, who love you unconditionally.</span>
              </li>
            </ul>
          </div>

          {/* Section: The Investment */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Villages Require Investment</h2>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Strong relationships don't happen by accident. They require intentional investment of time, energy, and genuine care. The best village-builders understand that support systems are built through consistent, mutual investment.
          </p>

          <blockquote className="text-2xl font-medium text-gray-900 border-l-4 border-gray-900 pl-6 my-8 italic">
            "You can't just show up when you need something. You have to show up when others need you."
          </blockquote>

          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Invest in Your Village:</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Be present:</strong> Show up consistently, not just during crises or celebrations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Be generous:</strong> Share opportunities, knowledge, and connections freely.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Be curious:</strong> Ask about their goals, challenges, and dreams. Really listen.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Be reliable:</strong> Follow through on commitments and be someone others can count on.</span>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="bg-gray-50 rounded-lg p-8 my-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">This Week's Challenge</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Are we building villages that truly allow us to be the best version of ourselves? Take a moment to evaluate your current support system:
            </p>
            
            <ul className="space-y-3 text-lg text-gray-700 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>Who in your life challenges you to grow?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>Who genuinely celebrates your success?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>Who can you turn to when things get difficult?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>What gaps exist in your support system?</span>
              </li>
            </ul>
            
            <p className="text-lg font-medium text-gray-900">
              This week, find someone you admire. Send them an email, say hello, take them to lunch. Build a village that protects, uplifts, and stands with you.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-gray-700">
            Remember: the strength of your village directly impacts the height of your potential. Choose wisely, invest generously, and build intentionally. Your future self will thank you for the relationships you cultivate today.
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