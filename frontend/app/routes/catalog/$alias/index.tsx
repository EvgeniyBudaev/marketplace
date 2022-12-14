import { inputFromSearch } from "remix-domains";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Catalog, catalogLinks } from "~/pages";
import { getCatalogDetail } from "~/shared/api/catalogs";
import { getProductsByCatalog } from "~/shared/api/products";
import { mapParamsToDto } from "~/shared/api/products/utils";
import { internalError } from "~/utils";

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const { alias } = params as { alias: string };
  const formattedParams = mapParamsToDto({
    ...formValues,
    sort: formValues.sort ?? "price_asc",
  });

  const catalogResponse = await getCatalogDetail(request, { alias });
  const productsResponse = await getProductsByCatalog(request, { alias, params: formattedParams });

  if (!catalogResponse.success || !productsResponse.success) {
    throw internalError();
  }

  return json({
    catalog: catalogResponse.data,
    products: productsResponse.data,
  });
};

export default function CatalogDetailRoute() {
  const data = useLoaderData<typeof loader>();

  return <Catalog catalog={data.catalog} products={data.products} />;
}

export function links() {
  return [...catalogLinks()];
}
