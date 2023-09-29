import { v } from "convex/values";
import { query } from "./_generated/server";

export const getProductsByMenuName = query({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("products").filter((q) => q.eq(q.field("menuId"), args.name)).collect();
    }
})