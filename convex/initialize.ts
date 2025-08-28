import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Initialize the database with sample data
export const initializeDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Create test user first
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "Vance@Stratir.com"))
      .first();

    let userId;
    if (!existingUser) {
      const now = Date.now();
      userId = await ctx.db.insert("users", {
        email: "Vance@Stratir.com",
        name: "Vance Stratir",
        role: "admin",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
    } else {
      userId = existingUser._id;
    }

    // Initialize categories
    const defaultCategories = [
      { name: "Personal Growth", slug: "personal-growth", color: "#10B981" },
      { name: "Wellness", slug: "wellness", color: "#8B5CF6" },
      { name: "Leadership", slug: "leadership", color: "#F59E0B" },
      { name: "Community", slug: "community", color: "#EF4444" },
      { name: "Purpose", slug: "purpose", color: "#3B82F6" },
      { name: "Mindset", slug: "mindset", color: "#EC4899" },
    ];

    for (const category of defaultCategories) {
      const existing = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q) => q.eq("slug", category.slug))
        .first();

      if (!existing) {
        const now = Date.now();
        await ctx.db.insert("categories", {
          ...category,
          isActive: true,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    // Create sample insights
    const sampleInsights = [
      {
        title: "Boundaries Protect Your Peace",
        content: "Learning to set healthy boundaries is essential for maintaining your mental and emotional well-being. Boundaries are not walls that keep people out, but rather guidelines that help you maintain healthy relationships while protecting your energy and values.",
        excerpt: "Learning to set healthy boundaries is essential for maintaining your mental and emotional well-being.",
        category: "Personal Growth",
        status: "published" as const,
        tags: ["boundaries", "mental-health", "self-care"],
      },
      {
        title: "Learn to be Present",
        content: "Mindfulness and presence are skills that can be developed with practice and intention. In our fast-paced world, learning to slow down and be fully present in each moment can transform your experience of life.",
        excerpt: "Mindfulness and presence are skills that can be developed with practice and intention.",
        category: "Mindset",
        status: "published" as const,
        tags: ["mindfulness", "presence", "meditation"],
      },
      {
        title: "The Power of Vulnerability in Leadership",
        content: "True leadership strength comes from the courage to be vulnerable and authentic. When leaders show their humanity, they create deeper connections and inspire others to bring their whole selves to work.",
        excerpt: "True leadership strength comes from the courage to be vulnerable and authentic.",
        category: "Leadership",
        status: "published" as const,
        tags: ["leadership", "vulnerability", "authenticity"],
      },
      {
        title: "Building Resilient Communities",
        content: "Strong communities are built on trust, mutual support, and shared values. Creating resilient communities requires intentional effort to foster connection and belonging among all members.",
        excerpt: "Strong communities are built on trust, mutual support, and shared values.",
        category: "Community",
        status: "published" as const,
        tags: ["community", "resilience", "connection"],
      },
      {
        title: "Finding Your Life Purpose",
        content: "Discovering your purpose is a journey of self-discovery and alignment with your values. It's not about finding the perfect career, but about understanding what gives your life meaning and direction.",
        excerpt: "Discovering your purpose is a journey of self-discovery and alignment with your values.",
        category: "Purpose",
        status: "draft" as const,
        tags: ["purpose", "meaning", "values"],
      },
      {
        title: "Wellness Beyond Physical Health",
        content: "True wellness encompasses mental, emotional, spiritual, and social well-being. It's about creating balance and harmony in all aspects of your life, not just maintaining physical fitness.",
        excerpt: "True wellness encompasses mental, emotional, spiritual, and social well-being.",
        category: "Wellness",
        status: "published" as const,
        tags: ["wellness", "holistic-health", "balance"],
      },
    ];

    // Check if insights already exist
    const existingInsights = await ctx.db.query("insights").collect();
    
    if (existingInsights.length === 0) {
      for (const insight of sampleInsights) {
        const now = Date.now();
        // Calculate read time based on content
        const calculateReadTime = (content: string) => {
          const wordsPerMinute = 200;
          const wordCount = content.split(/\s+/).length;
          const minutes = Math.ceil(wordCount / wordsPerMinute);
          return `${minutes} min`;
        };

        await ctx.db.insert("insights", {
          ...insight,
          author: "Vance Stratir",
          authorName: "Vance Stratir",
          authorBio: "Entrepreneur and advocate for personal growth.",
          authorId: userId,
          readTime: calculateReadTime(insight.content),
          publishedAt: insight.status === "published" ? now - Math.random() * 30 * 24 * 60 * 60 * 1000 : undefined,
          createdAt: now - Math.random() * 30 * 24 * 60 * 60 * 1000,
          updatedAt: now,
          viewCount: Math.floor(Math.random() * 100),
        });
      }
    }

    return { 
      message: "Database initialized successfully", 
      userId,
      insightsCount: sampleInsights.length,
      categoriesCount: defaultCategories.length,
    };
  },
});

// Migration function to update existing insights with new fields
export const migrateInsights = mutation({
  args: {},
  handler: async (ctx) => {
    const allInsights = await ctx.db.query("insights").collect();
    let updatedCount = 0;

    // Calculate read time based on content
    const calculateReadTime = (content: string) => {
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      return `${minutes} min`;
    };

    for (const insight of allInsights) {
      const updates: any = {};
      let needsUpdate = false;

      // Add readTime if missing
      if (!insight.readTime) {
        updates.readTime = calculateReadTime(insight.content);
        needsUpdate = true;
      }

      // Add authorName if missing
      if (!insight.authorName) {
        updates.authorName = insight.author || "Vance Stratir";
        needsUpdate = true;
      }

      // Add authorBio if missing
      if (!insight.authorBio) {
        updates.authorBio = "Entrepreneur and advocate for personal growth.";
        needsUpdate = true;
      }

      if (needsUpdate) {
        await ctx.db.patch(insight._id, updates);
        updatedCount++;
      }
    }

    return {
      message: `Migration completed. Updated ${updatedCount} insights.`,
      totalInsights: allInsights.length,
      updatedCount,
    };
  },
});
