import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all categories
export const getCategories = query({
  args: { activeOnly: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    let query = ctx.db.query("categories");
    
    const categories = await query.collect();
    
    if (args.activeOnly) {
      return categories.filter(cat => cat.isActive);
    }
    
    return categories;
  },
});

// Create category
export const createCategory = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if slug already exists
    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error("Category with this slug already exists");
    }

    const now = Date.now();
    const categoryId = await ctx.db.insert("categories", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      color: args.color,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return categoryId;
  },
});

// Initialize default categories
export const initializeDefaultCategories = mutation({
  args: {},
  handler: async (ctx) => {
    const defaultCategories = [
      { name: "Personal Growth", slug: "personal-growth", color: "#10B981" },
      { name: "Wellness", slug: "wellness", color: "#8B5CF6" },
      { name: "Leadership", slug: "leadership", color: "#F59E0B" },
      { name: "Community", slug: "community", color: "#EF4444" },
      { name: "Purpose", slug: "purpose", color: "#3B82F6" },
      { name: "Mindset", slug: "mindset", color: "#EC4899" },
    ];

    const createdCategories = [];
    
    for (const category of defaultCategories) {
      // Check if category already exists
      const existing = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q) => q.eq("slug", category.slug))
        .first();

      if (!existing) {
        const now = Date.now();
        const categoryId = await ctx.db.insert("categories", {
          ...category,
          isActive: true,
          createdAt: now,
          updatedAt: now,
        });
        createdCategories.push(categoryId);
      }
    }

    return createdCategories;
  },
});
