import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const createMenu = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        menuImage: v.string(),
        serviceId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("menus", {
            name: args.name,
            description: args.description,
            showcaseImage: args.menuImage,
            serviceId: ctx.db.normalizeId("services", args.serviceId)!,
        }) 
    }
})
export const updateMenu = mutation({
    args: {
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        menuImage: v.optional(v.string()),
        serviceId: v.string(),
        menuId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.patch(
            ctx.db.normalizeId("menus", args.menuId)!, {
                name: args.name,
                description: args.description, 
                showcaseImage: args.menuImage,
                serviceId: ctx.db.normalizeId("services", args.serviceId)!,
            }
        )
    }
})
export const deleteMenu = mutation({
    args: {
        menuId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.delete(ctx.db.normalizeId("menus", args.menuId)!);
    }
})
export const getMenuById = query({
    args: {
        menuId: v.id("menus")
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.menuId);
    }
})
export const getMenuByName = query({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("menus").filter((q) => q.eq(q.field("name"), args.name)).unique();
    }
})

export const getMenusByServiceId = query({
    args: {
        serviceId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("menus").filter((q) => q.eq(q.field("serviceId"), ctx.db.normalizeId("services", args.serviceId))).collect();
    }
})