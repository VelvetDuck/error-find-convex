import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    subscriptionPlans: defineTable({
        creditsPrice: v.number(),
        allowedServicesAmount: v.number(),
        title: v.string(),
        description: v.string(),
    }),
    profile: defineTable({
        username: v.string(),
        avatarUrl: v.string(),
        userId: v.string(),
        credits: v.number(),
        currentSubscriptionPlanId: v.id("subscriptionPlans"),
        role: v.union(
            v.literal("USER"),
            v.literal("ADMIN")
        )
    }),
    services: defineTable({
        title: v.string(),
        description: v.string(),
        profileId: v.id("profile"),
        logoUrl: v.string(),
    }),
    menus: defineTable({
        name: v.string(),
        description: v.string(),
        showcaseImage: v.string(),
        serviceId: v.id("services")
    }),
    products: defineTable({
        name: v.string(),
        description: v.string(),
        productImage: v.string(),
        price: v.number(),
        menuId: v.id("menus"),
        estimatedPrepareTime: v.number(),
        notes: v.optional(v.string()),
    }),
    orders: defineTable({
        name: v.string(),
        description: v.string(),
        tableNo: v.number(),
        status: v.union(
            v.literal("Fulfilled"),
            v.literal("Pending"),
            v.literal("Canceled"),
        ),
        price: v.number(),
    }),
    establishmentTables: defineTable({
        tableNo: v.number(),
        seatingCapacity: v.number(),
        status: v.union(
            v.literal("occupied"),
            v.literal("available"),
        ),
        serviceId: v.id("services"),
    })
})