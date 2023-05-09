import { inputFromForm } from "remix-domains";
import { json } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "i18next";
import isEmpty from "lodash/isEmpty";
import { Cart, cartLinks } from "~/pages/Cart";
import {
  createCartSession,
  decrementCartItem,
  getCart,
  getCartSession,
  incrementCartItem,
  removeCartItem,
  setQuantityCartItem,
} from "~/shared/api/cart";
import { mapCartActionToDto, mapCartSetQuantityToDto } from "~/shared/api/cart/utils";
import { getStoreFixedT } from "~/shared/store";
import { internalError, parseResponseError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);

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
  const [t] = await Promise.all([getStoreFixedT({ request })]);
  const cartSession = await getCartSession(request);
  const cart = JSON.parse(cartSession || "{}");
  let cartResponse;

  if (isEmpty(cart)) {
    cartResponse = await getCart(request, { uuid: null });
  } else {
    cartResponse = await getCart(request, { uuid: cart.uuid });
  }

  if (!cartResponse.success) {
    throw internalError();
  }

  const updatedCartSession = await createCartSession(cartResponse.data);

  const headers = new Headers();
  Object.entries(updatedCartSession.headers).forEach(([header, value]) => {
    headers.append(header, value);
  });

  return json({
    cart: cartResponse.data,
    headers,
    title: t("routes.titles.cart"),
  });
};

let hydration = 0;
export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined" && hydration) {
    return { title: i18next.t("routes.titles.cart") || "Cart" };
  }
  hydration++;
  return { title: data?.title || "Cart" };
};

export default function CartRoute() {
  const { cart } = useLoaderData<typeof loader>();
  return <Cart cart={cart} />;
}

export function links() {
  return [...cartLinks()];
}
