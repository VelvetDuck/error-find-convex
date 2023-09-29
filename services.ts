import { v } from "convex/values";
import { query } from "./_generated/server";

export const getByProfile = query({
    args: {profileId: v.id("profile")},
    handler: async (ctx, args) => {
        return await ctx.db.query("services").filter((q) => q.eq(q.field("profileId"), args.profileId)).collect();
    }
})

export const getByName = query({
    args: {name: v.string()},
    handler: async (ctx, args) => {
        return await ctx.db.query("services").filter((q) => q.eq(q.field("title"), args.name)).unique();
    }
})

export const getById = query({
    args: {id: v.string()},
    handler: async (ctx, args) => {
        const normalizedId = ctx.db.normalizeId("services", args.id);

        return ctx.db.get(normalizedId!);
    }
})

export const getTables = query({
    args: {serviceId: v.string()},
    handler: async (ctx, args) => {
        const normalizedId = ctx.db.normalizeId("services", args.serviceId);

        return ctx.db.query("establishmentTables").filter((q) => q.eq(q.field("serviceId"), normalizedId)).collect();
    }
})