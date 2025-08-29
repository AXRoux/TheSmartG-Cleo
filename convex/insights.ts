import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get a single insight by ID
export const getInsightById = query({
  args: { id: v.id("insights") },
  handler: async (ctx, args) => {
    const insight = await ctx.db.get(args.id);
    
    if (!insight) {
      return null;
    }

    // Get author details
    const author = await ctx.db.get(insight.authorId);
    
    return {
      ...insight,
      authorName: author?.name || insight.author,
    };
  },
});

// Get all insights with filtering
export const getInsights = query({
  args: {
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let insights;

    if (args.status) {
      insights = await ctx.db
        .query("insights")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .take(args.limit || 100);
    } else {
      insights = await ctx.db
        .query("insights")
        .order("desc")
        .take(args.limit || 100);
    }

    // Filter by category if specified
    const filteredInsights = args.category 
      ? insights.filter(insight => insight.category === args.category)
      : insights;

    // Get author details for each insight
    const insightsWithAuthors = await Promise.all(
      filteredInsights.map(async (insight) => {
        const author = await ctx.db.get(insight.authorId);
        return {
          ...insight,
          authorName: author?.name || insight.author,
          authorEmail: author?.email,
        };
      })
    );

    return insightsWithAuthors;
  },
});

// Get single insight by ID
export const getInsight = query({
  args: { id: v.id("insights") },
  handler: async (ctx, args) => {
    const insight = await ctx.db.get(args.id);
    if (!insight) return null;

    const author = await ctx.db.get(insight.authorId);
    return {
      ...insight,
      authorName: author?.name || insight.author,
      authorEmail: author?.email,
    };
  },
});

// Get single insight by slug
export const getInsightBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    try {
      // Use the index for better performance
      const insight = await ctx.db
        .query("insights")
        .withIndex("by_slug", (q) => q.eq("slug", args.slug))
        .first();
      
      if (!insight) {
        return null;
      }

      // Get author safely
      let author = null;
      try {
        if (insight.authorId) {
          author = await ctx.db.get(insight.authorId);
        }
      } catch (authorError) {
        console.log("Could not fetch author:", authorError);
      }

      return {
        ...insight,
        authorName: author?.name || insight.author || "Unknown Author",
        authorEmail: author?.email || null,
      };
      
    } catch (error) {
      console.error("Error in getInsightBySlug:", error);
      return null;
    }
  },
});

// Simple test query to debug database access
export const testQuery = query({
  args: {},
  handler: async (ctx) => {
    console.log("testQuery called");
    try {
      // Try the most basic query possible
      const insights = await ctx.db.query("insights").take(1);
      console.log("Basic query successful, found", insights.length, "insights");
      
      if (insights.length > 0) {
        const insight = insights[0];
        console.log("First insight:", {
          id: insight._id,
          title: insight.title,
          slug: insight.slug
        });
      }
      
      return { success: true, count: insights.length };
    } catch (error) {
      console.error("testQuery error:", error);
      console.error("Error type:", typeof error);
      console.error("Error message:", error instanceof Error ? error.message : 'Unknown error');
      console.error("Error stack:", error instanceof Error ? error.stack : 'No stack');
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },
});

// Migration function to fix missing slug fields
export const fixMissingSlugs = mutation({
  args: {},
  handler: async (ctx) => {
    console.log("Fixing missing slug fields...");
    
    const allInsights = await ctx.db.query("insights").collect();
    console.log("Found", allInsights.length, "insights");
    
    let fixedCount = 0;
    
    for (const insight of allInsights) {
      if (!insight.slug) {
        console.log("Fixing insight:", insight.title);
        
        // Generate slug from title
        const slug = insight.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        await ctx.db.patch(insight._id, { slug });
        fixedCount++;
      }
    }
    
    console.log("Fixed", fixedCount, "insights");
    return { message: `Fixed ${fixedCount} insights with missing slugs` };
  },
});

// Test function to create insight with minimal validation
export const createInsightTest = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const slug = args.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    try {
      // Get any existing user to use as author (ensures a valid Id<"users"> value)
      const existingUser = await ctx.db.query("users").first();
      if (!existingUser) {
        throw new Error("No users found. Initialize the database first.");
      }

      const newInsight = {
        title: args.title,
        slug,
        content: args.content,
        excerpt: `${args.content.substring(0, 200)}...`,
        category: "Personal Growth",
        author: existingUser.name || existingUser.email,
        authorName: existingUser.name || undefined,
        authorBio: "Entrepreneur and advocate for personal growth.",
        authorId: existingUser._id,
        readTime: "3 min",
        status: "draft" as "draft",
        tags: [],
        publishedAt: undefined,
        createdAt: now,
        updatedAt: now,
        viewCount: 0,
      };

      // Log the document we're about to insert
      console.log("createInsightTest → newInsight", newInsight);
      console.log("createInsightTest → existingUser", existingUser);

      const insightId = await ctx.db.insert("insights", newInsight);
      console.log("Insert successful, ID:", insightId);
      return insightId;
    } catch (error) {
      console.error("Convex insert failed - DETAILED ERROR:", error);
      console.error("Error type:", typeof error);
      console.error("Error message:", error instanceof Error ? error.message : 'Unknown error');
      console.error("Error stack:", error instanceof Error ? error.stack : 'No stack');
      throw error;
    }
  },
});

// Create new insight
export const createInsight = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    excerpt: v.string(),
    category: v.string(),
    authorId: v.id("users"),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"))),
    featuredImage: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    readTime: v.optional(v.string()),
    authorBio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    console.log("createInsight called with args:", JSON.stringify(args, null, 2));
    
    try {
    // Generate URL-friendly slug from title
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };

    const author = await ctx.db.get(args.authorId);
    if (!author) {
      throw new Error(`Author not found with ID: ${args.authorId}. Please ensure you are logged in and your account exists.`);
    }

    // Calculate read time if not provided
    const calculateReadTime = (content: string) => {
      // Clean the content and count actual words
      const words = content.trim().split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      
      // Use 180 WPM for web content (more realistic than 200)
      const wordsPerMinute = 180;
      const minutes = wordCount / wordsPerMinute;
      
      // More nuanced rounding:
      // - Less than 30 seconds: "< 1 min"
      // - 30 seconds to 1.5 minutes: "1 min" 
      // - Otherwise round to nearest minute
      if (minutes < 0.5) {
        return "< 1 min";
      } else if (minutes <= 1.5) {
        return "1 min";
      } else {
        return `${Math.round(minutes)} min`;
      }
    };

    // Generate unique slug
    let baseSlug = generateSlug(args.title);
    let slug = baseSlug;
    let counter = 1;
    
    // Check for duplicate slugs and append number if needed
    while (await ctx.db.query("insights").withIndex("by_slug", (q) => q.eq("slug", slug)).first()) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    const now = Date.now();
    const insightId = await ctx.db.insert("insights", {
      title: args.title,
      slug: slug,
      content: args.content,
      excerpt: args.excerpt,
      category: args.category,
      author: author.name || author.email,
      authorName: author.name,
      authorBio: args.authorBio || "Entrepreneur and advocate for personal growth.",
      authorId: args.authorId,
      readTime: args.readTime || calculateReadTime(args.content),
      status: args.status || "draft",
      featuredImage: args.featuredImage,
      tags: args.tags || [],
      publishedAt: args.status === "published" ? now : undefined,
      createdAt: now,
      updatedAt: now,
      viewCount: 0,
    });

    return insightId;
    
    } catch (error) {
      console.error("Error in createInsight:", error);
      throw error;
    }
  },
});

// Migration function to recalculate all reading times with improved algorithm
export const recalculateReadingTimes = mutation({
  args: {},
  handler: async (ctx) => {
    console.log("Starting reading time recalculation...");
    
    const calculateReadTime = (content: string) => {
      // Clean the content and count actual words
      const words = content.trim().split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      
      // Use 180 WPM for web content (more realistic than 200)
      const wordsPerMinute = 180;
      const minutes = wordCount / wordsPerMinute;
      
      // More nuanced rounding:
      // - Less than 30 seconds: "< 1 min"
      // - 30 seconds to 1.5 minutes: "1 min" 
      // - Otherwise round to nearest minute
      if (minutes < 0.5) {
        return "< 1 min";
      } else if (minutes <= 1.5) {
        return "1 min";
      } else {
        return `${Math.round(minutes)} min`;
      }
    };

    const allInsights = await ctx.db.query("insights").collect();
    let updatedCount = 0;
    const results = [];

    for (const insight of allInsights) {
      const oldReadTime = insight.readTime;
      const newReadTime = calculateReadTime(insight.content);
      
      if (oldReadTime !== newReadTime) {
        try {
          await ctx.db.patch(insight._id, { 
            readTime: newReadTime,
            updatedAt: Date.now()
          });
          updatedCount++;
          results.push({
            id: insight._id,
            title: insight.title,
            oldReadTime,
            newReadTime,
            status: 'updated'
          });
        } catch (error) {
          results.push({
            id: insight._id,
            title: insight.title,
            oldReadTime,
            newReadTime,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      } else {
        results.push({
          id: insight._id,
          title: insight.title,
          readTime: oldReadTime,
          status: 'unchanged'
        });
      }
    }

    console.log(`Reading time recalculation complete. Updated ${updatedCount} of ${allInsights.length} insights.`);
    
    return {
      message: `Updated ${updatedCount} of ${allInsights.length} insights`,
      updatedCount,
      totalCount: allInsights.length,
      results
    };
  },
});

// Update insight
export const updateInsight = mutation({
  args: {
    id: v.id("insights"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    category: v.optional(v.string()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    featuredImage: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    readTime: v.optional(v.string()),
    authorBio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const existing = await ctx.db.get(id);
    
    if (!existing) {
      throw new Error("Insight not found");
    }

    // Calculate read time if content is updated but readTime is not provided
    const calculateReadTime = (content: string) => {
      // Clean the content and count actual words
      const words = content.trim().split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      
      // Use 180 WPM for web content (more realistic than 200)
      const wordsPerMinute = 180;
      const minutes = wordCount / wordsPerMinute;
      
      // More nuanced rounding:
      // - Less than 30 seconds: "< 1 min"
      // - 30 seconds to 1.5 minutes: "1 min" 
      // - Otherwise round to nearest minute
      if (minutes < 0.5) {
        return "< 1 min";
      } else if (minutes <= 1.5) {
        return "1 min";
      } else {
        return `${Math.round(minutes)} min`;
      }
    };

    const now = Date.now();
    const updateData: any = {
      ...updates,
      updatedAt: now,
    };

    // Auto-calculate read time if content changed but readTime wasn't provided
    if (updates.content && !updates.readTime) {
      updateData.readTime = calculateReadTime(updates.content);
    }

    // Set publishedAt when status changes to published
    if (updates.status === "published" && existing.status !== "published") {
      updateData.publishedAt = now;
    }

    await ctx.db.patch(id, updateData);
    return await ctx.db.get(id);
  },
});

// Delete insight
export const deleteInsight = mutation({
  args: { id: v.id("insights") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Increment view count
export const incrementViewCount = mutation({
  args: { id: v.id("insights") },
  handler: async (ctx, args) => {
    const insight = await ctx.db.get(args.id);
    if (!insight) return;

    await ctx.db.patch(args.id, {
      viewCount: insight.viewCount + 1,
    });

    // Log analytics event
    await ctx.db.insert("analytics", {
      insightId: args.id,
      event: "view",
      timestamp: Date.now(),
    });
  },
});

// Get insights statistics
export const getInsightsStats = query({
  args: {},
  handler: async (ctx) => {
    const allInsights = await ctx.db.query("insights").collect();
    
    const stats = {
      total: allInsights.length,
      published: allInsights.filter(i => i.status === "published").length,
      draft: allInsights.filter(i => i.status === "draft").length,
      archived: allInsights.filter(i => i.status === "archived").length,
      thisMonth: allInsights.filter(i => {
        const createdDate = new Date(i.createdAt);
        const now = new Date();
        return createdDate.getMonth() === now.getMonth() && 
               createdDate.getFullYear() === now.getFullYear();
      }).length,
      categories: [...new Set(allInsights.map(i => i.category))].length,
      totalViews: allInsights.reduce((sum, i) => sum + i.viewCount, 0),
    };

    return stats;
  },
});


