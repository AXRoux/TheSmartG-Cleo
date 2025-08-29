import { mutation, query } from "./_generated/server";
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

        // Generate slug from title
        const generateSlug = (title: string) => {
          return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        };

        await ctx.db.insert("insights", {
          ...insight,
          slug: generateSlug(insight.title),
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
// Debug function to check specific document
export const debugInsight = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const insight = await ctx.db.get(args.id as any);
    return insight;
  },
});

// Check all insights and their slug status
export const checkAllInsights = query({
  args: {},
  handler: async (ctx) => {
    const allInsights = await ctx.db.query("insights").collect();
    return allInsights.map(insight => ({
      id: insight._id,
      title: insight.title,
      hasSlug: !!insight.slug,
      slug: insight.slug || null,
      author: insight.author,
      generatedSlug: insight.title ? insight.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') : null,
    }));
  },
});

// Simple test function to get insight by generated slug
export const testGetByGeneratedSlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const allInsights = await ctx.db.query("insights").collect();
    const insight = allInsights.find(i => {
      if (!i.title) return false;
      const generatedSlug = i.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return generatedSlug === args.slug;
    });
    
    return insight ? {
      found: true,
      title: insight.title,
      slug: insight.slug,
      generatedSlug: insight.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      id: insight._id
    } : { found: false };
  },
});

// Fix specific insight by ID
export const fixInsightSlug = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const insight = await ctx.db.get(args.id as any);
    if (!insight) {
      return { error: "Insight not found" };
    }

    // Generate slug from title
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };

    if (!insight.slug) {
      let baseSlug = generateSlug(insight.title);
      let slug = baseSlug;
      let counter = 1;
      
      // Check for duplicate slugs and append number if needed
      while (await ctx.db.query("insights").withIndex("by_slug", (q) => q.eq("slug", slug)).first()) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      await ctx.db.patch(insight._id, { slug });
      return { message: `Added slug: ${slug}` };
    }

    return { message: "Insight already has slug", slug: insight.slug };
  },
});

export const migrateInsights = mutation({
  args: {},
  handler: async (ctx) => {
    const allInsights = await ctx.db.query("insights").collect();
    let updatedCount = 0;
    const results = [];

    // Calculate read time based on content
    const calculateReadTime = (content: string) => {
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      return `${minutes} min`;
    };

    // Generate slug from title
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };

    for (const insight of allInsights) {
      const updates: any = {};
      let needsUpdate = false;
      const insightInfo = { id: insight._id, title: insight.title, hasSlug: !!insight.slug };

      // Add slug if missing (CRITICAL FIX)
      if (!insight.slug) {
        let baseSlug = generateSlug(insight.title);
        let slug = baseSlug;
        let counter = 1;
        
        // Check for duplicate slugs and append number if needed
        while (await ctx.db.query("insights").withIndex("by_slug", (q) => q.eq("slug", slug)).first()) {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
        
        updates.slug = slug;
        needsUpdate = true;
        insightInfo.addedSlug = slug;
      }

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
        try {
          await ctx.db.patch(insight._id, updates);
          updatedCount++;
          insightInfo.updated = true;
        } catch (error) {
          insightInfo.error = error.message;
        }
      }

      results.push(insightInfo);
    }

    return {
      message: `Migration completed. Updated ${updatedCount} insights.`,
      totalInsights: allInsights.length,
      updatedCount,
      details: results,
    };
  },
});

// Force fix all insights with missing slugs
export const forceFixSlugs = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all insights, including those that might not match the schema
    const allDocs = await ctx.db.query("insights").collect();
    let fixedCount = 0;
    const results = [];

    // Generate slug from title
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };

    for (const doc of allDocs) {
      const docInfo = { id: doc._id, title: doc.title || 'Untitled' };
      
      if (!doc.slug) {
        try {
          let baseSlug = generateSlug(doc.title || 'untitled');
          let slug = baseSlug;
          let counter = 1;
          
          // Check for duplicate slugs and append number if needed
          while (await ctx.db.query("insights").withIndex("by_slug", (q) => q.eq("slug", slug)).first()) {
            slug = `${baseSlug}-${counter}`;
            counter++;
          }
          
          await ctx.db.patch(doc._id, { slug });
          fixedCount++;
          docInfo.addedSlug = slug;
          docInfo.status = 'fixed';
        } catch (error) {
          docInfo.error = error.message;
          docInfo.status = 'failed';
        }
      } else {
        docInfo.status = 'already-has-slug';
        docInfo.existingSlug = doc.slug;
      }
      
      results.push(docInfo);
    }

    return {
      message: `Force fix completed. Fixed ${fixedCount} documents.`,
      totalDocs: allDocs.length,
      fixedCount,
      details: results,
    };
  },
});
