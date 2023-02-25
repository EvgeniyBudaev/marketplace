import { inputFromForm, inputFromSearch } from "remix-domains";
import { json } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { ProductAdd, productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { getCatalogs } from "~/shared/api/catalogs";
import { mapParamsToDto } from "~/shared/api/catalogs/utils";
import { addProduct } from "~/shared/api/products";
import { internalError } from "~/utils";
import { useLoaderData } from "@remix-run/react";
import { getAttributesByCatalog } from "~/shared/api/attributes";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[ProductAdd action formValues] ", formValues);

  const response = await addProduct(request, formValues);

  if (!response.success) {
    throw internalError();
  }

  return json({
    product: response.data,
  });
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);

  const formattedParams = mapParamsToDto({
    ...formValues,
  });
  console.log("[catalogs formattedParams: ] ", formattedParams);
  const catalogsResponse = await getCatalogs(request, { params: formattedParams });

  if (!catalogsResponse.success) {
    throw internalError();
  }
  console.log("response.data: ", catalogsResponse.data);
  return json({
    catalogs: catalogsResponse.data,
  });
};

export default function ProductAddRoute() {
  const data = useLoaderData<typeof loader>();
  return <ProductAdd catalogs={data.catalogs} />;
}

export function links() {
  return [...productAddLinks()];
}
