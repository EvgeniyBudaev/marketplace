import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { Cart, cartLinks } from "~/pages/Cart";
import {
  decrementCartItem,
  getCart,
  incrementCartItem,
  removeCartItem,
  setQuantityCartItem,
} from "~/shared/api/cart";
import { mapCartActionToDto, mapCartSetQuantityToDto } from "~/shared/api/cart/utils";
import { internalError, parseResponseError } from "~/utils";
import { useLoaderData } from "@remix-run/react";
import { inputFromForm } from "remix-domains";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("cart formValues: ", formValues);

  try {
    let response;
    if (formValues.type === "increment") {
      const formattedValues = mapCartActionToDto(formValues as any);
      response = await incrementCartItem(request, formattedValues);
    }
    if (formValues.type === "decrement") {
      const formattedValues = mapCartActionToDto(formValues as any);
      response = await decrementCartItem(request, formattedValues);
    }
    if (formValues.type === "setQuantity") {
      const formattedValues = mapCartSetQuantityToDto(formValues as any);
      response = await setQuantityCartItem(request, formattedValues);
    }
    if (formValues.type === "remove") {
      const formattedValues = mapCartActionToDto(formValues as any);
      response = await removeCartItem(request, formattedValues);
    }

    if (response && response.success) {
      return json(response.data);
    }

    return json(response);
  } catch (error) {
    return parseResponseError(error);
  }
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const params = { uuid: "054c3bdf-610e-4c2f-ba84-f80173ef5a17" };

  const cart = await getCart(request, params);

  if (!cart.success) {
    throw internalError();
  }

  return json({
    cart: cart.data,
  });
};

export default function CartRoute() {
  const { cart } = useLoaderData<typeof loader>();
  return <Cart cart={cart} />;
}

export function links() {
  return [...cartLinks()];
}
