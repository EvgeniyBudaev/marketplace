import { inputFromForm } from "remix-domains";
import { json } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
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
import type { TCart } from "~/shared/api/cart";
import { mapCartActionToDto, mapCartSetQuantityToDto } from "~/shared/api/cart/utils";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import type { TBaseRouteHandle } from "~/types/routes";
import { internalError, parseResponseError } from "~/utils";

type TLoaderData = {
  cart: TCart;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success?: boolean;
  title?: string;
};

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

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.cart") || "Cart" }];
  }
  return [{ title: data?.title || "Cart" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.cart"),
  },
};

export default function CartRoute() {
  const data = useLoaderData<TLoaderData>();

  return <Cart cart={data.cart} />;
}

export function links() {
  return [...cartLinks()];
}
