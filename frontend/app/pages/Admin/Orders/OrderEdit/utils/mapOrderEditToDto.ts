import type { TParams } from "~/types";

type TProps = {
  params: TParams;
};

type TMapOrderEditToDto = (props: TProps) => any;

export const mapOrderEditToDto: TMapOrderEditToDto = ({ params }) => {
  return {
    csrf: params.csrf,
    id: params.id,
    items: JSON.stringify(params.items),
    // paymentVariantId: params.paymentVariant,
    paymentVariantId: 1,
    recipient: JSON.stringify({
      email: params.recipientEmail,
      name: params.recipientName,
      phone: params.recipientPhone,
      surname: params.recipientSurname,
    }),
    shippingAddress: JSON.stringify({
      address: params.shippingAddress,
      comment: params.shippingComment,
      flat: params.shippingFlat,
      floor: params.shippingFloor,
    }),
    status: params.status.value,
  };
};
