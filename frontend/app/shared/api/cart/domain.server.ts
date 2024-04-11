import {
  cartItemDecrementParamsSchema,
  cartItemIncrementParamsSchema,
  cartItemRemoveParamsSchema,
  cartParamsSchema,
  cartSchema,
  cartItemSetQuantityParamsSchema,
} from "#app/shared/api/cart";
import {
  decrementCartItemApi,
  getCartApi,
  incrementCartItemApi,
  removeCartItemApi,
  setQuantityCartItemApi,
} from "#app/shared/api/cart/utils";
import { apiDomainFunction } from "#app/utils";

export const getCart = apiDomainFunction(
  cartParamsSchema,
  cartSchema
)(getCartApi);

export const decrementCartItem = apiDomainFunction(
  cartItemDecrementParamsSchema,
  cartSchema
)(decrementCartItemApi);

export const incrementCartItem = apiDomainFunction(
  cartItemIncrementParamsSchema,
  cartSchema
)(incrementCartItemApi);

export const removeCartItem = apiDomainFunction(
  cartItemRemoveParamsSchema,
  cartSchema
)(removeCartItemApi);

export const setQuantityCartItem = apiDomainFunction(
  cartItemSetQuantityParamsSchema,
  cartSchema
)(setQuantityCartItemApi);
