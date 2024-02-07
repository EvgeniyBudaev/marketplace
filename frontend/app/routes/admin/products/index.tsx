import { inputFromForm, inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { Products, productsLinks } from "~/pages/Admin/Products";
import { deleteProduct, EProductAction, getProducts } from "~/shared/api/products";
import type { TProducts } from "~/shared/api/products";
import { mapProductsToDto } from "~/shared/api/products/utils";
import { getResponseError } from "~/shared/domain";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import { checkRequestPermission, createPath } from "~/utils";

type TLoaderData = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  products: TProducts;
  success?: boolean;
  title?: string;
};

export const action = async (args: ActionFunctionArgs) => {
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

      return json({ success: false });
    }

    return json({ success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return json({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(createPath({ route: ERoutes.Login }));
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
        title: t("routes.titles.products"),
      });
    }

    return json({ success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return json({ success: false, formError, fieldErrors });
  }
};

export const meta: MetaFunction = ({ data }: any) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.products") || "Products" }];
  }
  return [{ title: data?.title || "Products" }];
};

export default function ProductsIndexRoute() {
  const data = useLoaderData<TLoaderData>();

  return <Products products={data.products} />;
}

export function links() {
  return [...productsLinks()];
}
