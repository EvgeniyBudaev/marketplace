import { inputFromForm, inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { ERoutes } from "~/enums";
import { ProductAdd, productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { getCatalogs } from "~/shared/api/catalogs";
import { addProduct } from "~/shared/api/products";
import { mapProductAddToDto, mapProductsToDto } from "~/shared/api/products/utils";
import { getResponseError } from "~/shared/domain";
import { createPath, internalError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  const formattedParams = mapProductAddToDto({
    ...formValues,
  });
  console.log("[ProductAdd action formattedParams] ", formattedParams);

  try {
    const response = await addProduct(request, formattedParams);
    console.log("[response.success]", response.success);
    if (response.success) {
      return redirect(
        createPath({
          route: ERoutes.AdminProducts,
        }),
      );
    }
    return badRequest({ success: false });
    // return null;
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    console.log("[ERROR] ", error);
    console.log("[fieldErrors] ", fieldErrors);
    console.log("[formError] ", formError);
    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);

  const formattedParams = mapProductsToDto({
    ...formValues,
  });

  const catalogsResponse = await getCatalogs(request, { params: formattedParams });

  if (!catalogsResponse.success) {
    throw internalError();
  }

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
