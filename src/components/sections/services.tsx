import React from 'react';
import { Card } from "@/components/ui/card";
import { MessageSquare, Sparkles, Calendar, BarChart3, Users } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
  icon: React.ReactNode;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const services: Service[] = [
  {
    id: 'strategic-communications',
    title: 'Strategic Communications',
    description: 'Transform complex messages into clear, compelling narratives that resonate with your audience.',
    outcomes: [
      'Message architecture & positioning',
      'Narrative development & storytelling',
      'Crisis communications planning'
    ],
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    accentColor: 'amber',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-amber-600'
  },
  {
    id: 'brand-marketing',
    title: 'Brand & Marketing',
    description: 'Build authentic brand experiences that connect with customers and drive meaningful engagement.',
    outcomes: [
      'Brand voice & identity development',
      'Integrated marketing campaigns',
      'Content systems & strategy'
    ],
    icon: <Sparkles className="w-6 h-6 text-white" />,
    accentColor: 'teal',
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-teal-600'
  },
  {
    id: 'event-planning',
    title: 'Event Planning & Execution',
    description: 'Create memorable experiences through seamless event management and flawless execution.',
    outcomes: [
      'End-to-end logistics coordination',
      'Vendor management & partnerships',
      'Live production & experience design'
    ],
    icon: <Calendar className="w-6 h-6 text-white" />,
    accentColor: 'violet',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-violet-600'
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Turn ambitious visions into achievable outcomes with structured planning and execution.',
    outcomes: [
      'Strategic roadmaps & timelines',
      'Progress tracking & optimization',
      'Stakeholder reporting & updates'
    ],
    icon: <BarChart3 className="w-6 h-6 text-white" />,
    accentColor: 'blue',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600'
  },
  {
    id: 'community-engagement',
    title: 'Community Engagement',
    description: 'Build lasting relationships through authentic stakeholder engagement and community building.',
    outcomes: [
      'Stakeholder mapping & analysis',
      'Community workshops & forums',
      'Engagement metrics & insights'
    ],
    icon: <Users className="w-6 h-6 text-white" />,
    accentColor: 'emerald',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-emerald-600'
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 mb-6">
            Services
          </h2>
          <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Turning complexity into clarity through strategic expertise and thoughtful execution
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group relative bg-white border border-zinc-200/60 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/20 hover:border-zinc-300/60"
            >
              {/* Complexity → Clarity Line */}
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-6 font-medium">
                Complexity → Clarity
              </div>

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} mb-6 shadow-lg`}>
                {service.icon}
              </div>

              {/* Service Title */}
              <h3 className="font-display text-2xl text-zinc-900 mb-4 leading-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-600 text-lg leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Outcomes */}
              <ul className="space-y-3">
                {service.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2.5 flex-shrink-0" />
                    <span className="text-zinc-700 leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>

              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}