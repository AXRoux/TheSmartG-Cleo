import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

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

    // Compare password using bcrypt if passwordHash is stored
    if (user.passwordHash) {
      const ok = bcrypt.compareSync(args.password, user.passwordHash);
      if (!ok) throw new Error("Invalid credentials");
    } else {
      // Fallback: support seeded demo account
      if (!(args.email === "Vance@Stratir.com" && args.password === "admin123")) {
        throw new Error("Invalid credentials");
      }
    }

    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive
    };
  },
});

// Initialize test account
export const initializeTestAccount = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Ensure Vance exists (demo admin with default password)
    const vance = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "Vance@Stratir.com"))
      .first();
    let vanceId = vance?._id;
    if (!vance) {
      vanceId = await ctx.db.insert("users", {
        email: "Vance@Stratir.com",
        name: "Vance Stratir",
        role: "admin",
        isActive: true,
        passwordHash: bcrypt.hashSync("admin123", 10),
        createdAt: now,
        updatedAt: now,
      });
    }

    // Ensure Cleo exists (no default password; use reset flow to set one)
    const cleo = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "cleo@thesmartg.com"))
      .first();
    if (!cleo) {
      await ctx.db.insert("users", {
        email: "cleo@thesmartg.com",
        name: "Cleo",
        role: "admin",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
    }

    return vanceId as any;
  },
});

// Admin upsert user with password hashing
export const adminUpsertUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("editor"), v.literal("viewer"))),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    const passwordHash = bcrypt.hashSync(args.password, 10);

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name ?? existing.name,
        role: args.role ?? existing.role,
        passwordHash,
        isActive: true,
        updatedAt: now,
      });
      return existing._id;
    }

    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      role: args.role ?? "admin",
      isActive: true,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    });
    return userId;
  }
});

// Request password reset: create token and send via email in Next route
export const createPasswordResetToken = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (!user) return null; // don't leak

    const token = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
    const expiresAt = Date.now() + 1000 * 60 * 30; // 30 minutes
    await ctx.db.insert("passwordResetTokens", {
      userId: user._id,
      token,
      expiresAt,
      used: false,
      createdAt: Date.now(),
    });
    return { token, userId: user._id };
  }
});

// Complete password reset: validate token, hash password, update user
export const completePasswordReset = mutation({
  args: { token: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const rec = await ctx.db
      .query("passwordResetTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (!rec || rec.used || rec.expiresAt < Date.now()) {
      throw new Error("Invalid or expired token");
    }
    const hash = bcrypt.hashSync(args.password, 10);
    await ctx.db.patch(rec.userId, { passwordHash: hash, updatedAt: Date.now() });
    await ctx.db.patch(rec._id, { used: true });
    return true;
  }
});
