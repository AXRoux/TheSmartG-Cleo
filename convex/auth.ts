import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new user (for registration)
export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("editor"), v.literal("viewer"))),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const now = Date.now();
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      role: args.role || "viewer",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return userId;
  },
});

// Get user by email (for login)
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    return user;
  },
});

// Get current user profile
export const getCurrentUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user;
  },
});

// Update user profile
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("editor"), v.literal("viewer"))),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(userId);
  },
});

// Validate user session (for authentication middleware)
export const validateSession = query({
  args: { 
    userId: v.id("users"),
    authToken: v.string() 
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    
    if (!user || !user.isActive) {
      return null;
    }

    // In a real app, you'd validate the token against stored sessions
    // For demo purposes, we'll just check if the token format is valid
    if (args.authToken.startsWith('auth_') && args.authToken.length > 20) {
      return {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive
      };
    }

    return null;
  },
});

// Authenticate user (login)
export const authenticateUser = mutation({
  args: {
    email: v.string(),
    password: v.string()
  },
  handler: async (ctx, args) => {
    // Get user by email
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user || !user.isActive) {
      throw new Error("Invalid credentials");
    }

    // In a real app, you'd hash and compare passwords
    // For demo purposes, we'll use a simple check
    if (args.email === "Vance@Stratir.com" && args.password === "admin123") {
      return {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive
      };
    }

    throw new Error("Invalid credentials");
  },
});

// Initialize test account
export const initializeTestAccount = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if test account already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "Vance@Stratir.com"))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    const now = Date.now();
    const userId = await ctx.db.insert("users", {
      email: "Vance@Stratir.com",
      name: "Vance Stratir",
      role: "admin",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return userId;
  },
});
