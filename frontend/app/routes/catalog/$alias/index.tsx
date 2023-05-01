import { inputFromForm, inputFromSearch } from "remix-domains";
import {json} from "@remix-run/node";
import type { LoaderArgs, ActionArgs , MetaFunction} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import isEmpty from "lodash/isEmpty";
import { Catalog, catalogLinks } from "~/pages";
import { createCartSession, getCart, getCartSession, incrementCartItem } from "~/shared/api/cart";
import { getCatalogDetail } from "~/shared/api/catalogs";
import { getProductsByCatalog } from "~/shared/api/products";
import { mapParamsToDto } from "~/shared/api/products/utils";
import {getStoreFixedT} from "~/shared/store";
import { internalError, parseResponseError } from "~/utils";

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
  const [t] = await Promise.all([getStoreFixedT(request)]);
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const { alias } = params as { alias: string };
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

  const catalogResponse = await getCatalogDetail(request, { alias });
  const productsResponse = await getProductsByCatalog(request, { alias, params: formattedParams });

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
    title: t("pages.catalog.meta.title"),
  });
};

export const meta: MetaFunction = ({ data }) => {
  return { title: data?.title || "Catalog" };
};

export default function CatalogDetailRoute() {
  const data = useLoaderData<typeof loader>();

  return <Catalog cart={data.cart} catalog={data.catalog} products={data.products} />;
}

export function links() {
  return [...catalogLinks()];
}
