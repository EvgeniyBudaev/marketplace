import { inputFromForm, inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { EPermissions, ERoutes } from "~/enums";
import { CatalogEdit, catalogEditLinks, EFormFields } from "~/pages/Admin/Catalogs/CatalogEdit";
import type { TForm } from "~/pages/Admin/Catalogs/CatalogEdit";
import { getAttributes, getAttributesByCatalog } from "~/shared/api/attributes";
import { mapParamsToDto } from "~/shared/api/attributes/utils";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { editCatalog, CatalogsApi, getCatalogDetail } from "~/shared/api/catalogs";
import { createPath } from "~/utils";
import { checkRequestPermission } from "~/utils/permission";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[formValues]", formValues);
  const formattedParams = CatalogsApi.mapEditCatalogToDto(formValues);
  console.log("[formattedParams]", formattedParams);

  try {
    const response = await editCatalog(request, formattedParams);
    console.log("[response.success]", response.success);

    if (response.success) {
      console.log("[OK]");
      console.log("[response.data]", response.data);
      return redirect(
        createPath({
          route: ERoutes.AdminCatalogs,
        }),
      );
    }

    const fieldErrors = getInputErrors<keyof TForm>(response, Object.values(EFormFields));
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

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;

  const isPermissions = await checkRequestPermission(request, [EPermissions.Administrator]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

  const { alias } = params;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapParamsToDto({
    ...formValues,
  });

  try {
    const attributesResponse = await getAttributes(request, { params: formattedParams });
    const attributesByCatalogResponse = await getAttributesByCatalog(request, { alias });
    const catalogDetailResponse = await getCatalogDetail(request, { alias });

    if (
      attributesResponse.success &&
      attributesByCatalogResponse.success &&
      catalogDetailResponse.success
    ) {
      return json({
        attributes: attributesResponse.data,
        attributesByCatalog: attributesByCatalogResponse.data,
        catalog: catalogDetailResponse.data,
        success: true,
      });
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

export default function CatalogEditRoute() {
  const data = useLoaderData<typeof loader>();
  console.log("data.catalog: ", data.catalog);

  return (
    <CatalogEdit
      attributes={data.attributes}
      attributesByCatalog={data.attributesByCatalog}
      catalog={data.catalog}
    />
  );
}

export function links() {
  return [...catalogEditLinks()];
}
