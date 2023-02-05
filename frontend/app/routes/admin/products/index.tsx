import { inputFromSearch } from "remix-domains";
import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Products, productsLinks } from "~/pages/Admin/Products";
import { getProducts } from "~/shared/api/products";
import { mapParamsToDto } from "~/shared/api/products/utils";
import { internalError } from "~/utils";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  console.log("[products formValues] ", formValues);
  const formattedParams = mapParamsToDto({
    ...formValues,
  });
  const response = await getProducts(request, { params: formattedParams });

  if (!response.success) {
    throw internalError();
  }

  return json({
    products: response.data,
  });
};

export default function ProductsRoute() {
  const data = useLoaderData<typeof loader>();

  return <Products products={data.products} />;
}

export function links() {
  return [...productsLinks()];
}
