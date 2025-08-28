"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function YouCantFixEverythingPage() {
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
              Mindset
            </Badge>
            <span>•</span>
            <span>Articles</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            You Can't Fix Everything!
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
              <span>Time to read: 6 min.</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            A PR pro's lesson in patience when control is impossible.
          </p>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          {/* Opening Quote */}
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <p className="text-lg leading-relaxed text-gray-700 italic">
              "I'm talking to myself this week, but since you're here reading, come along for a PR professional's scariest moment: realizing you can't control the outcome. This week, let's choose patience. Remember that while you think you're always in control, the truth is you can't fix everything — no matter how much you want to!"
            </p>
          </div>

          {/* The Reality Check Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">The Control Illusion</h2>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            As PR professionals, we're trained to be the fixers. The ones who step in when crisis hits, who smooth over rough edges, who make the impossible look effortless. We pride ourselves on being the calm in the storm, the voice of reason when chaos reigns. But here's what nobody tells you in those crisis management courses: sometimes, you simply can't fix everything.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            I've spent countless nights staring at my phone, refreshing news feeds, monitoring social sentiment, believing that if I just worked harder, stayed up later, or crafted the perfect response, I could control the narrative. I could fix it. But the truth that took me years to accept is both humbling and liberating: we are not as powerful as we think we are.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            The world doesn't operate on our timelines. People don't react according to our carefully planned strategies. And outcomes—real, lasting outcomes—often depend on factors completely outside our sphere of influence. This isn't a failure; it's simply reality.
          </p>

          {/* The PR Professional's Dilemma Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">When Expertise Meets Humility</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What We Can Control</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Our response time and quality</li>
                <li>• The accuracy of our messaging</li>
                <li>• Our preparation and strategy</li>
                <li>• How we show up for our teams</li>
                <li>• The relationships we build beforehand</li>
              </ul>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6 border-l-4 border-gray-900">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What We Can't Control</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Public perception and reaction</li>
                <li>• Media coverage decisions</li>
                <li>• Competitor actions or market forces</li>
                <li>• Individual stakeholder responses</li>
                <li>• The ultimate outcome of our efforts</li>
              </ul>
            </div>
          </div>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            The hardest lesson in PR isn't learning how to craft the perfect press release or manage a crisis—it's learning when to let go. It's recognizing that your worth as a professional isn't measured solely by outcomes you can't fully control, but by the excellence of your process and the integrity of your approach.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <p className="text-lg leading-relaxed text-gray-700">
              I remember a campaign that should have been a slam dunk. Perfect timing, compelling story, all the right elements. But the world had other plans. A major news event broke the same day, shifting everyone's attention. No amount of pivoting or pushing could reclaim that moment. The campaign wasn't a failure—it was a reminder that context matters more than control.
            </p>
          </div>

          {/* Choosing Patience Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">The Power of Patient Action</h2>
          
          <blockquote className="text-2xl font-medium text-gray-900 border-l-4 border-gray-900 pl-6 my-8 italic">
            "Patience isn't passive. It's the active choice to continue doing excellent work while accepting that results unfold in their own time."
          </blockquote>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Choosing patience doesn't mean becoming complacent or giving up on excellence. It means channeling your energy into what you can influence while releasing the anxiety around what you can't. It means understanding that patience is actually a strategic advantage.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            When you operate from a place of patience rather than panic, you make better decisions. You communicate more clearly. You build stronger relationships because you're not constantly in reactive mode. You become the kind of professional that clients and colleagues turn to precisely because you don't promise to fix everything—you promise to do everything excellently.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            Patience allows you to play the long game. While others are burning out trying to control every variable, you're building sustainable practices, nurturing relationships, and creating value that compounds over time. The most successful PR professionals I know aren't the ones who claim to control everything—they're the ones who excel at their craft while remaining gracefully detached from outcomes.
          </p>

          {/* Professional Growth Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Redefining Success</h2>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            What if we measured success not by our ability to control outcomes, but by our ability to show up consistently with excellence, integrity, and wisdom? What if we valued the relationships we build, the crises we prevent, and the calm we bring to chaos just as much as the headlines we generate?
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            The most liberating moment in my career came when I stopped trying to be the hero of every story and started focusing on being the most reliable, thoughtful, and strategic partner I could be. Paradoxically, this shift actually improved my results. When you stop grasping so tightly for control, you often find more influence than you ever had before.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            This isn't about lowering standards or accepting mediocrity. It's about raising them. It's about pursuing excellence in your process, your thinking, your communication, and your relationships while holding outcomes lightly. It's about being so good at what you do that you can afford to be patient with results.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-8 my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Questions for Reflection</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li>• Where in your work are you trying to control things beyond your influence?</li>
              <li>• How might your stress levels change if you focused only on your process and preparation?</li>
              <li>• What would patience look like in your most challenging current project?</li>
              <li>• How can you redefine success to include factors within your control?</li>
            </ul>
          </div>

          {/* Final Thoughts Section */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">The Freedom in Letting Go</h2>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            So here's my reminder to myself, and to you: You can't fix everything, and that's not a bug—it's a feature. It's what keeps us humble, human, and hungry for genuine improvement rather than just the appearance of control.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            This week, I'm choosing patience. I'm choosing to do my absolute best work while holding the outcomes lightly. I'm choosing to trust that excellence has its own gravity, that good work finds its way, and that sometimes the most powerful thing we can do is simply show up consistently with our best effort.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            The world doesn't need us to fix everything. It needs us to be excellent at what we do, present in our relationships, and wise enough to know the difference between influence and control. That's more than enough. In fact, it's everything.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-8 my-12">
            <p className="text-lg italic text-gray-900 text-center">
              "The most powerful professionals aren't those who control everything—they're those who excel at what they can influence while gracefully accepting what they cannot."
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gray-50 rounded-lg p-8 my-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">This Week's Practice</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              This week, let's choose patience. Let's focus on what we can control and release what we cannot:
            </p>
            
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>Identify one situation where you're trying to control outcomes beyond your influence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>List what you can control versus what you can't in that situation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>Focus your energy on excelling at what you can influence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gray-900 mt-3 flex-shrink-0"></span>
                <span>Practice letting go of the rest with grace and patience</span>
              </li>
            </ul>
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