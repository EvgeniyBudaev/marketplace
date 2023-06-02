import { json } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import isEmpty from "lodash/isEmpty";
import i18next from "i18next";
import { Order, orderLinks } from "~/pages";
import { getCart, getCartSession } from "~/shared/api/cart";
import { getResponseError } from "~/shared/domain";
import { getStoreFixedT } from "~/shared/store";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);
  const cartSession = await getCartSession(request);
  const cart = JSON.parse(cartSession || "{}");

  try {
    if (isEmpty(cart)) {
      return badRequest({ success: false });
    } else {
      const response = await getCart(request, { uuid: cart.uuid });

      if (response.success) {
        return json({
          cart: response.data,
          success: true,
          title: t("routes.titles.order"),
        });
      }

      return badRequest({ success: false });
    }
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return { title: i18next.t("routes.titles.order") || "Order" };
  }
  return { title: data?.title || "Order" };
};

export default function OrderRoute() {
  const { cart } = useLoaderData<typeof loader>();
  return <Order cart={cart} />;
}

export function links() {
  return [...orderLinks()];
}
