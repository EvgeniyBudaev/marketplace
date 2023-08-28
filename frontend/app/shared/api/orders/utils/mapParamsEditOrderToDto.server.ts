import type { TParams } from "~/types";
import type { TOrderEditParams } from "~/shared/api/orders";

type TMapParamsEditOrderToDto = (params: TParams) => TOrderEditParams;
export const mapParamsEditOrderToDto: TMapParamsEditOrderToDto = (params: TParams) => {
  return {
    ...params,
    id: Number(params.id),
    items: JSON.parse(params.items),
    paymentVariantId: Number(params.paymentVariantId),
    recipient: JSON.parse(params.recipient),
    shippingAddress: JSON.parse(params.shippingAddress),
    status: params.status,
  };
};
