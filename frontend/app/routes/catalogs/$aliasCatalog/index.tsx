import { inputFromForm, inputFromSearch } from "remix-domains";
import { json } from "@remix-run/node";
import type { LoaderArgs, ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import isEmpty from "lodash/isEmpty";
import i18next from "i18next";
import { Catalog, catalogLinks } from "~/pages";
import { createCartSession, getCart, getCartSession, incrementCartItem } from "~/shared/api/cart";
import type { TCart } from "~/shared/api/cart";
import { getCatalogDetail } from "~/shared/api/catalogs";
import type { TCatalogDetail } from "~/shared/api/catalogs";
import { getProductsByCatalog } from "~/shared/api/products";
import type { TProductsByCatalog } from "~/shared/api/products";
import { mapParamsToDto } from "~/shared/api/products/utils";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import { internalError, parseResponseError } from "~/utils";

type TLoaderData = {
  cart: TCart;
  catalog: TCatalogDetail;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  products: TProductsByCatalog;
  success?: boolean;
  title?: string;
};

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);

  try {
    const response = await incrementCartItem(request, formValues);

    if (response.success) {
      return json(response.data);
    }
    return json(response);
  } catch (error) {
    return parseResponseError(error);
  }
};

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const { aliasCatalog } = params as { aliasCatalog: string };
  const formattedParams = mapParamsToDto({
    ...formValues,
    sort: formValues.sort ?? "price_asc",
  });

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

  const catalogResponse = await getCatalogDetail(request, { alias: aliasCatalog });
  const productsResponse = await getProductsByCatalog(request, {
    alias: aliasCatalog,
    params: formattedParams,
  });

  if (!cartResponse.success || !catalogResponse.success || !productsResponse.success) {
    throw internalError();
  }

  const headers = new Headers();
  Object.entries(updatedCartSession.headers).forEach(([header, value]) => {
    headers.append(header, value);
  });

  return json({
    cart: cartResponse.data,
    catalog: catalogResponse.data,
    products: productsResponse.data,
    headers,
    title: t("routes.titles.catalogs"),
  });
};

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.catalogs") || "Catalog" }];
  }
  return [{ title: data?.title || "Catalog" }];
};

export default function CatalogDetailIndexRoute() {
  const data = useLoaderData<TLoaderData>();

  return <Catalog cart={data.cart} catalog={data.catalog} products={data.products} />;
}

export function links() {
  return [...catalogLinks()];
}
