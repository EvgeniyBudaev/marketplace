import type { z } from "zod";
import type {
  cartItemDecrementParamsSchema,
  cartItemIncrementParamsSchema,
  cartItemSchema,
  cartParamsSchema,
  cartSchema,
  cartItemSetQuantityParamsSchema,
  cartItemRemoveParamsSchema,
} from "~/shared/api/cart/schemas";

export type TCartItem = z.infer<typeof cartItemSchema>;

export type TCart = z.infer<typeof cartSchema>;

export type TCartParams = z.infer<typeof cartParamsSchema>;

export type TCartItemIncrementParams = z.infer<typeof cartItemIncrementParamsSchema>;
export type TCartItemDecrementParams = z.infer<typeof cartItemDecrementParamsSchema>;
export type TCartItemRemoveParams = z.infer<typeof cartItemRemoveParamsSchema>;
export type TCartItemSetQuantityParams = z.infer<typeof cartItemSetQuantityParamsSchema>;
