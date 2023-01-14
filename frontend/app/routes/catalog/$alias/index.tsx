import { inputFromForm, inputFromSearch } from "remix-domains";
import { ActionArgs, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Catalog, catalogLinks } from "~/pages";
import { getCart, incrementCartItem } from "~/shared/api/cart";
import { getCatalogDetail } from "~/shared/api/catalogs";
import { getProductsByCatalog } from "~/shared/api/products";
import { mapParamsToDto } from "~/shared/api/products/utils";
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
  console.log("catalog loader");
  const { params, request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const { alias } = params as { alias: string };
  const formattedParams = mapParamsToDto({
    ...formValues,
    sort: formValues.sort ?? "price_asc",
  });

  const paramsCart = { uuid: "054c3bdf-610e-4c2f-ba84-f80173ef5a17" };
  const cartResponse = await getCart(request, paramsCart);
  const catalogResponse = await getCatalogDetail(request, { alias });
  const productsResponse = await getProductsByCatalog(request, { alias, params: formattedParams });

  if (!cartResponse.success || !catalogResponse.success || !productsResponse.success) {
    throw internalError();
  }

  return json({
    cart: cartResponse.data,
    catalog: catalogResponse.data,
    products: productsResponse.data,
  });
};

export default function CatalogDetailRoute() {
  const data = useLoaderData<typeof loader>();

  return <Catalog cart={data.cart} catalog={data.catalog} products={data.products} />;
}

export function links() {
  return [...catalogLinks()];
}
