import { inputFromForm, inputFromSearch } from "remix-domains";
import {json, MetaFunction, redirect} from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { EPermissions, ERoutes } from "~/enums";
import { EFormFields } from "~/pages/Admin/Attributes/AttributeEdit";
import type { TForm } from "~/pages/Admin/Attributes/AttributeEdit";
import { ProductEdit, productEditLinks } from "~/pages/Admin/Products/ProductEdit";
import { getCatalogs } from "~/shared/api/catalogs";
import { editProduct, getAdminProductDetail } from "~/shared/api/products";
import { mapProductEditToDto, mapProductsToDto } from "~/shared/api/products/utils";
import { getInputErrors, getResponseError } from "~/shared/domain";
import {getStoreFixedT} from "~/shared/store";
import { checkRequestPermission, createPath } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("formValues: ", formValues);
  const formattedParams = mapProductEditToDto({
    ...formValues,
  });
  console.log("formattedParams: ", formattedParams);

  try {
    const productResponse = await editProduct(request, formattedParams);

    if (productResponse.success) {
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
    console.log("[ERROR] ", error);
    console.log("[fieldErrors] ", fieldErrors);
    console.log("[formError] ", formError);

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const [t, isPermissions] = await Promise.all([getStoreFixedT(request), checkRequestPermission(request, [EPermissions.Administrator])]);

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
      console.log("[OK]");
      return json({
        catalogs: catalogsResponse.data,
        product: productDetailResponse.data,
        success: true,
        title: t("pages.admin.productEdit.meta.title"),
      });
    }

    const fieldErrors = getInputErrors<keyof TForm>(
      productDetailResponse,
      Object.values(EFormFields),
    );
    console.log("[BAD]");
    console.log("[fieldErrors] ", fieldErrors);

    return badRequest({ fieldErrors, success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    console.log("[ERROR] ", error);
    console.log("[fieldErrors] ", fieldErrors);
    console.log("[formError] ", formError);

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const meta: MetaFunction = ({ data }) => {
  return { title: data?.title || "Product editing" };
};

export default function ProductEditRoute() {
  const data = useLoaderData<typeof loader>();

  return <ProductEdit catalogs={data.catalogs} product={data.product} />;
}

export function links() {
  return [...productEditLinks()];
}
