import { v } from "convex/values";
import { internalQuery, query } from "./_generated/server";

export const findSubscriptionPlanByTitle = internalQuery({
    args: {
        title: v.string(),
    },
    handler: async (ctx, args) => {
        return ctx.db.query("subscriptionPlans").filter((q) => q.eq(q.field("title"), args.title)).unique();
    }
})

export const find = query({
    args: {
        id: v.id("subscriptionPlans")
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    }
})

export const countServices = query({
    args: {
        userId: v.string(),
        profileId: v.id("profile")
    },

    handler: async (ctx, args) => {
        return await ctx.db.query("services").filter((q) => q.eq(q.field("profileId"), args.profileId)).collect();
    }
})