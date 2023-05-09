import { inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { ProductAdd, productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { getCatalogs } from "~/shared/api/catalogs";
import { addProduct } from "~/shared/api/products";
import { mapProductsToDto } from "~/shared/api/products/utils";
import { getResponseError } from "~/shared/domain";
import { getStoreFixedT } from "~/shared/store";
import { checkRequestPermission, createPath, internalError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formData = await request.formData();

  try {
    const response = await addProduct(request, formData);
    if (response.success) {
      return redirect(
        createPath({
          route: ERoutes.AdminProducts,
        }),
      );
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
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

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
    title: t("routes.titles.productAdd"),
  });
};

let hydration = 0;
export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined" && hydration) {
    return { title: i18next.t("routes.titles.productAdd") || "Product addition" };
  }
  hydration++;
  return { title: data?.title || "Product addition" };
};

export default function ProductAddRoute() {
  const data = useLoaderData<typeof loader>();
  return <ProductAdd catalogs={data.catalogs} />;
}

export function links() {
  return [...productAddLinks()];
}
