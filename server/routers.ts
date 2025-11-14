import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    list: publicProcedure.query(async () => {
      const { getAllProducts } = await import("./db");
      return await getAllProducts();
    }),
    getById: publicProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "id" in val && typeof (val as any).id === "number") {
          return val as { id: number };
        }
        throw new Error("Invalid input: expected { id: number }");
      })
      .query(async ({ input }) => {
        const { getProductById } = await import("./db");
        return await getProductById(input.id);
      }),
    featured: publicProcedure.query(async () => {
      const { getFeaturedProducts } = await import("./db");
      return await getFeaturedProducts();
    }),
    byCategory: publicProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "category" in val && typeof (val as any).category === "string") {
          return val as { category: string };
        }
        throw new Error("Invalid input: expected { category: string }");
      })
      .query(async ({ input }) => {
        const { getProductsByCategory } = await import("./db");
        return await getProductsByCategory(input.category);
      }),
    byBrand: publicProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "brand" in val && typeof (val as any).brand === "string") {
          return val as { brand: string };
        }
        throw new Error("Invalid input: expected { brand: string }");
      })
      .query(async ({ input }) => {
        const { getProductsByBrand } = await import("./db");
        return await getProductsByBrand(input.brand);
      }),
  }),

  cart: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const { getCartItems } = await import("./db");
      return await getCartItems(ctx.user.id);
    }),
    add: protectedProcedure
      .input((val: unknown) => {
        if (
          typeof val === "object" &&
          val !== null &&
          "productId" in val &&
          typeof (val as any).productId === "number" &&
          "size" in val &&
          typeof (val as any).size === "string" &&
          "quantity" in val &&
          typeof (val as any).quantity === "number"
        ) {
          return val as { productId: number; size: string; quantity: number };
        }
        throw new Error("Invalid input: expected { productId: number, size: string, quantity: number }");
      })
      .mutation(async ({ ctx, input }) => {
        const { addToCart } = await import("./db");
        return await addToCart(ctx.user.id, input.productId, input.size, input.quantity);
      }),
    updateQuantity: protectedProcedure
      .input((val: unknown) => {
        if (
          typeof val === "object" &&
          val !== null &&
          "cartItemId" in val &&
          typeof (val as any).cartItemId === "number" &&
          "quantity" in val &&
          typeof (val as any).quantity === "number"
        ) {
          return val as { cartItemId: number; quantity: number };
        }
        throw new Error("Invalid input: expected { cartItemId: number, quantity: number }");
      })
      .mutation(async ({ input }) => {
        const { updateCartItemQuantity } = await import("./db");
        await updateCartItemQuantity(input.cartItemId, input.quantity);
        return { success: true };
      }),
    remove: protectedProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "cartItemId" in val && typeof (val as any).cartItemId === "number") {
          return val as { cartItemId: number };
        }
        throw new Error("Invalid input: expected { cartItemId: number }");
      })
      .mutation(async ({ input }) => {
        const { removeFromCart } = await import("./db");
        await removeFromCart(input.cartItemId);
        return { success: true };
      }),
    clear: protectedProcedure.mutation(async ({ ctx }) => {
      const { clearCart } = await import("./db");
      await clearCart(ctx.user.id);
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
