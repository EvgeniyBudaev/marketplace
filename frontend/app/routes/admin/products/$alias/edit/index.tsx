import { inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { EFormFields } from "~/pages/Admin/Attributes/AttributeEdit";
import type { TForm } from "~/pages/Admin/Attributes/AttributeEdit";
import { ProductEdit, productEditLinks } from "~/pages/Admin/Products/ProductEdit";
import { getCatalogs } from "~/shared/api/catalogs";
import { editProduct, getAdminProductDetail } from "~/shared/api/products";
import { mapProductsToDto } from "~/shared/api/products/utils";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { getStoreFixedT } from "~/shared/store";
import { checkRequestPermission, createPath } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { params, request } = args;
  const { alias } = params;
  const formData = await request.formData();
  const formattedParams = mapProductsToDto({
    ...formData,
  });
  const [t] = await Promise.all([getStoreFixedT({ request })]);

  try {
    const productDetailResponse = await editProduct(request, formData);
    const catalogsResponse = await getCatalogs(request, { params: formattedParams });

    if (productDetailResponse.success && catalogsResponse.success) {
      // return redirect(
      //   createPath({
      //     route: ERoutes.AdminProductEdit,
      //     params: { alias: alias ?? productDetailResponse.data.alias },
      //   }),
      // );
      return json({
        catalogs: catalogsResponse.data,
        product: productDetailResponse.data,
        success: true,
        title: t("routes.titles.productEdit"),
      });
    }

    return badRequest({ success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

  const { alias } = params;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapProductsToDto({
    ...formValues,
  });

  try {
    const productDetailResponse = await getAdminProductDetail(request, { alias });
    const catalogsResponse = await getCatalogs(request, { params: formattedParams });

    if (productDetailResponse.success && catalogsResponse.success) {
      return json({
        catalogs: catalogsResponse.data,
        product: productDetailResponse.data,
        success: true,
        title: t("routes.titles.productEdit"),
      });
    }

    const fieldErrors = getInputErrors<keyof TForm>(
      productDetailResponse,
      Object.values(EFormFields),
    );

    return badRequest({ fieldErrors, success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

let hydration = 0;
export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined" && hydration) {
    return { title: i18next.t("routes.titles.productEdit") || "Product editing" };
  }
  hydration++;
  return { title: data?.title || "Product editing" };
};

export default function ProductEditRoute() {
  const data = useLoaderData<typeof loader>();

  return <ProductEdit catalogs={data.catalogs} product={data.product} />;
}

export function links() {
  return [...productEditLinks()];
}
