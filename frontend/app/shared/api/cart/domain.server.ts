import { cartIncrementParamsSchema, cartParamsSchema, cartSchema } from "~/shared/api/cart";
import { getCartApi, incrementCartItemApi } from "~/shared/api/cart/utils";
import { apiDomainFunction } from "~/utils";

export const getCart = apiDomainFunction(cartParamsSchema, cartSchema)(getCartApi);

export const incrementCartItem = apiDomainFunction(
  cartIncrementParamsSchema,
  cartSchema,
)(incrementCartItemApi);
