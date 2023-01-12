import { z } from "zod";
import {
  cartIncrementParamsSchema,
  cartItemSchema,
  cartParamsSchema,
  cartSchema,
} from "~/shared/api/cart/schemas";

export type TCartItem = z.infer<typeof cartItemSchema>;

export type TCart = z.infer<typeof cartSchema>;

export type TCartParams = z.infer<typeof cartParamsSchema>;

export type TCartItemIncrementParams = z.infer<typeof cartIncrementParamsSchema>;

export type TActionCartItemChange = {
  payload: TCartItem;
};

export type TActionCartItemDelete = {
  payload: {
    id: number;
  };
};
