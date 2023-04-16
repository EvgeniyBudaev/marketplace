import { inputFromForm, inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { EPermissions, ERoutes } from "~/enums";
import { Products, productsLinks } from "~/pages/Admin/Products";
import { deleteProduct, EProductAction, getProducts } from "~/shared/api/products";
import { mapProductsToDto } from "~/shared/api/products/utils";
import { getResponseError } from "~/shared/domain";
import { checkRequestPermission } from "~/utils/permission";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const { _method, alias } = await inputFromForm(request);

  try {
    if (_method === EProductAction.DeleteProduct) {
      const response = await deleteProduct(request, { alias });

      if (response.success) {
        return json({
          success: true,
        });
      }

      return badRequest({ success: false });
    }

    return badRequest({ success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;

  const isPermissions = await checkRequestPermission(request, [EPermissions.Administrator]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapProductsToDto({
    ...formValues,
  });

  try {
    const response = await getProducts(request, { params: formattedParams });

    if (response.success) {
      return json({
        products: response.data,
        success: true,
      });
    }

    return badRequest({ success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export default function ProductsRoute() {
  const data = useLoaderData<typeof loader>();

  return <Products products={data.products} />;
}

export function links() {
  return [...productsLinks()];
}
