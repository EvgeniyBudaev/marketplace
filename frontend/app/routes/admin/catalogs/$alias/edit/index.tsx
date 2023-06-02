import { inputFromForm, inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, ActionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { CatalogEdit, catalogEditLinks, EFormFields } from "~/pages/Admin/Catalogs/CatalogEdit";
import type { TForm } from "~/pages/Admin/Catalogs/CatalogEdit";
import { getAttributes, getAttributesByCatalog } from "~/shared/api/attributes";
import { mapParamsToDto } from "~/shared/api/attributes/utils";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { editCatalog, CatalogsApi, getCatalogDetail } from "~/shared/api/catalogs";
import { getCsrfSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import { checkCSRFToken, checkRequestPermission, createPath } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;

  const [csrfSession, formValues, t] = await Promise.all([
    getCsrfSession(request),
    inputFromForm(request),
    getStoreFixedT({ request }),
  ]);

  const csrfToken = formValues.csrf;
  const checkCsrf = checkCSRFToken({ csrfToken, session: csrfSession, t });
  if (checkCsrf?.error) return checkCsrf.error;

  const formattedParams = CatalogsApi.mapEditCatalogToDto(formValues);

  try {
    const response = await editCatalog(request, formattedParams);

    if (response.success) {
      return redirect(
        createPath({
          route: ERoutes.AdminCatalogs,
        }),
      );
    }

    const fieldErrors = getInputErrors<keyof TForm>(response, Object.values(EFormFields));

    return badRequest({ fieldErrors, success: false });
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
  const formattedParams = mapParamsToDto({
    ...formValues,
  });

  try {
    const [attributesResponse, attributesByCatalogResponse, catalogDetailResponse] =
      await Promise.all([
        getAttributes(request, { params: formattedParams }),
        getAttributesByCatalog(request, { alias }),
        getCatalogDetail(request, { alias }),
      ]);

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
        title: t("routes.titles.catalogEdit"),
      });
    }

    return badRequest({ success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return { title: i18next.t("routes.titles.catalogEdit") || "Catalog editing" };
  }
  return { title: data?.title || "Catalog editing" };
};

export default function CatalogEditRoute() {
  const data = useLoaderData<typeof loader>();

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
