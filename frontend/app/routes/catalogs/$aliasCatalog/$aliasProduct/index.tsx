import { json } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import isEmpty from "lodash/isEmpty";
import i18next from "i18next";
import { ProductDetail, productDetailLinks } from "~/pages";
import { createCartSession, getCart, getCartSession } from "~/shared/api/cart";
import type { TCart } from "~/shared/api/cart";
import { getProductDetail } from "~/shared/api/products";
import type { TProductDetail } from "~/shared/api/products";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import { internalError } from "~/utils";

type TLoaderData = {
  cart: TCart;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  product: TProductDetail;
  success?: boolean;
  title?: string;
};

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);
  const { aliasProduct } = params as { aliasProduct: string };
  console.log("[aliasProduct] ", aliasProduct);

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

  const productDetailResponse = await getProductDetail(request, { alias: aliasProduct });

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

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.product") || "Product" }];
  }
  return [{ title: data?.title || "Product" }];
};

export default function ProductDetailRoute() {
  const data = useLoaderData<TLoaderData>();

  return <ProductDetail cart={data.cart} product={data.product} />;
}

export function links() {
  return [...productDetailLinks()];
}
