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
        <header className="mb-8">
          <div className="space-y-6">
          {/* Category */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              Wellness
            </Badge>
            <span>•</span>
            <span>Articles</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Learn to be Present
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
              <span>Time to read: 5 min.</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Productivity is great, but presence is priceless—here's your reminder to slow down.
          </p>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          {/* Opening Quote */}
          <blockquote className="text-2xl font-medium text-gray-900 border-l-4 border-gray-900 pl-6 my-8 italic">
            "Be productive, but be present!"
          </blockquote>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            In our relentless pursuit of professional success, we often forget the most fundamental truth: life is happening right now, in this moment, with the people who matter most.
          </p>

          {/* Section: The Recovering Workaholic's Dilemma */}
          <div className="bg-gray-50 rounded-lg p-8 my-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Recovering Workaholic's Dilemma</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              As a recovering workaholic, I understand the intoxicating pull of productivity. The endless emails, the late-night strategy sessions, the satisfaction of crossing another item off an ever-growing to-do list. But somewhere in the pursuit of professional excellence, we risk losing sight of what truly matters: genuine human connection.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            The modern world celebrates busyness as a badge of honor. We wear our packed schedules like armor, believing that constant motion equals meaningful progress. Yet in this frantic dance of productivity, we often step on the toes of those we love most.
          </p>

          {/* Section: The Cost of Divided Attention */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-12">The Cost of Divided Attention</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            When we're physically present but mentally elsewhere—scrolling through emails during dinner, taking calls during family time, or planning tomorrow's meetings while our loved ones share their day—we send a clear message about our priorities. And that message isn't the one we intend to send.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            True success isn't just about climbing the corporate ladder or achieving professional milestones. It's about creating a life where work enhances rather than eclipses our relationships. It's about being fully present in the moments that matter, recognizing that these moments are finite and precious.
          </p>

          {/* Section: The Practice of Presence */}
          <div className="bg-gray-50 rounded-lg p-8 my-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Practice of Presence</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Learning to be present is a skill, not a destination. It requires intentional practice and gentle self-compassion when we inevitably drift back into productivity mode. Here are the practices that have transformed my relationship with both work and life:
            </p>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Digital Boundaries:</strong> Creating sacred spaces and times where technology doesn't intrude on human connection.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Mindful Transitions:</strong> Taking three deep breaths when shifting from work mode to personal time, allowing yourself to truly arrive.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span><strong className="text-gray-900">Quality over Quantity:</strong> Choosing fewer commitments but showing up fully for each one.</span>
              </li>
            </ul>
          </div>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            The paradox of presence is that when we stop trying to be everywhere at once, we become more effective in every area of our lives. Our work improves because we're more focused. Our relationships deepen because we're truly there. Our well-being flourishes because we're not constantly scattered across a dozen competing priorities.
          </p>

          {/* Key Quote */}
          <blockquote className="text-2xl font-medium text-gray-900 border-l-4 border-gray-900 pl-6 my-12 italic">
            "The most successful people aren't those who accomplish the most tasks, but those who are most present for the moments that matter."
          </blockquote>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            As we navigate the demands of modern life, let's remember that productivity and presence aren't mutually exclusive. We can be ambitious and grounded, driven and mindful, successful and connected. The key is recognizing that true wealth isn't measured in achievements alone, but in the depth of our relationships and the richness of our everyday experiences.
          </p>

          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            So yes, be productive. Chase your dreams, build your empire, and create the professional life you envision. But above all, be present. Be here, now, with the people who love you just as you are. Because at the end of the day, it's not the emails we answered or the meetings we attended that we'll remember—it's the moments we were fully, completely, beautifully present.
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