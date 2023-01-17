import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Products, productsLinks } from "~/pages/Admin/Products";
import { getProducts } from "~/shared/api/products";
import { internalError } from "~/utils";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const response = await getProducts(request);

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
