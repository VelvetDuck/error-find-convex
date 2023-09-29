import { v } from "convex/values";
import { internalMutation,query } from "./_generated/server";

export const find = query({
    args: {
        userId: v.string()
    },
    handler: () => {
        return "";
    }
})

export const create = internalMutation({
    args: {
        user: v.string(),
        username: v.string(),
        avatar: v.string(),
        subscriptionPlanId: v.id("subscriptionPlans"),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("profile", {
            userId: args.user,
            username: args.username,
            avatarUrl: args.avatar,
            credits: 0,
            currentSubscriptionPlanId: args.subscriptionPlanId,
            role: "USER"
        })
    }
})

export const get = query({
    args: {
        user: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("profile").filter((q) => q.eq(q.field("userId"), args.user)).unique();
    }
})