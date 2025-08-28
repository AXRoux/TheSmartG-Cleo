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
    const author = await ctx.db.get(args.authorId);
    if (!author) {
      throw new Error("Author not found");
    }

    // Calculate read time if not provided
    const calculateReadTime = (content: string) => {
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      return `${minutes} min`;
    };

    const now = Date.now();
    const insightId = await ctx.db.insert("insights", {
      title: args.title,
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
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      return `${minutes} min`;
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


