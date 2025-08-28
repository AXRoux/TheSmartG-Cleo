import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table for authentication
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("editor"), v.literal("viewer")),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  // Insights/Content table
  insights: defineTable({
    title: v.string(),
    content: v.string(),
    excerpt: v.string(),
    category: v.string(),
    author: v.string(), // Display name for author
    authorName: v.optional(v.string()), // Full author name (for consistency)
    authorBio: v.optional(v.string()), // Author bio/description
    authorId: v.id("users"),
    readTime: v.optional(v.string()), // e.g., "3 min"
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    featuredImage: v.optional(v.string()),
    tags: v.array(v.string()),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    viewCount: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_author", ["authorId"])
    .index("by_published_date", ["publishedAt"]),

  // Categories table
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  // Media/Images table
  media: defineTable({
    filename: v.string(),
    originalName: v.string(),
    mimeType: v.string(),
    size: v.number(),
    url: v.string(),
    alt: v.optional(v.string()),
    uploadedBy: v.id("users"),
    createdAt: v.number(),
  }).index("by_uploader", ["uploadedBy"]),

  // Analytics/Stats table
  analytics: defineTable({
    insightId: v.id("insights"),
    event: v.union(v.literal("view"), v.literal("share"), v.literal("like")),
    timestamp: v.number(),
    userAgent: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
  })
    .index("by_insight", ["insightId"])
    .index("by_event", ["event"])
    .index("by_timestamp", ["timestamp"]),
});
