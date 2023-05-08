import { json } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import isEmpty from "lodash/isEmpty";
import i18next from "i18next";
import { ProductDetail, productDetailLinks } from "~/pages";
import { createCartSession, getCart, getCartSession } from "~/shared/api/cart";
import { getProductDetail } from "~/shared/api/products";
import { getStoreFixedT } from "~/shared/store";
import { internalError } from "~/utils";

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);
  const { alias } = params as { alias: string };

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

  const productDetailResponse = await getProductDetail(request, { alias });

  if (!cartResponse.success || !productDetailResponse.success) {
    throw internalError();
  }

  const headers = new Headers();
  Object.entries(updatedCartSession.headers).forEach(([header, value]) => {
    headers.append(header, value);
  });

  return json({
    cart: cartResponse.data,
    product: productDetailResponse.data,
    title: t("routes.titles.product"),
  });
};

let hydration = 0;
export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined" && hydration) {
    return { title: i18next.t("routes.titles.product") || "Product" };
  }
  hydration++;
  return { title: data?.title || "Product" };
};

export default function ProductDetailRoute() {
  const data = useLoaderData<typeof loader>();

  return <ProductDetail cart={data.cart} product={data.product} />;
}

export function links() {
  return [...productDetailLinks()];
}
