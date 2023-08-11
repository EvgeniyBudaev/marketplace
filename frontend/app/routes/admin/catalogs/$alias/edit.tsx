import { inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { CatalogEdit, catalogEditLinks, EFormFields } from "~/pages/Admin/Catalogs/CatalogEdit";
import type { TForm } from "~/pages/Admin/Catalogs/CatalogEdit";
import { getAttributes, getAttributesByCatalog } from "~/shared/api/attributes";
import type { TAttributes, TAttributesByCatalog } from "~/shared/api/attributes";
import { mapParamsToDto } from "~/shared/api/attributes/utils";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { editCatalog, getCatalogDetail } from "~/shared/api/catalogs";
import type { TCatalogDetail } from "~/shared/api/catalogs";
import { mapCatalogsToDto } from "~/shared/api/catalogs/utils";
import { commitSession, getCsrfSession, getSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import type { TBaseRouteHandle, TDomainErrors } from "~/types";
import { checkCSRFToken, checkRequestPermission, createPath } from "~/utils";

type TLoaderData = {
  attributes: TAttributes;
  attributesByCatalog: TAttributesByCatalog;
  catalog: TCatalogDetail;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success?: boolean;
  title?: string;
};

export const action = async (args: ActionArgs) => {
  const { params, request } = args;
  const { alias } = params;

  const [csrfSession, formData, t] = await Promise.all([
    getCsrfSession(request),
    request.formData(),
    getStoreFixedT({ request }),
  ]);

  const csrfToken = formData.get("csrf") as string | null;
  const checkCsrf = checkCSRFToken({ csrfToken, session: csrfSession, t });
  if (checkCsrf?.error) return checkCsrf.error;

  const formattedParams = mapCatalogsToDto({
    ...formData,
  });

  try {
    const [attributesResponse, attributesByCatalogResponse, catalogDetailResponse, session] =
      await Promise.all([
        getAttributes(request, { params: formattedParams }),
        getAttributesByCatalog(request, { alias }),
        editCatalog(request, formData),
        getSession(request.headers.get("Cookie")),
      ]);

    if (
      attributesResponse.success &&
      attributesByCatalogResponse.success &&
      catalogDetailResponse.success
    ) {
      session.flash("FamilyMart_CatalogEdit", {
        success: true,
      });

      return redirect(
        createPath({
          route: ERoutes.AdminCatalogEdit,
          params: { alias: catalogDetailResponse.data.alias },
        }),
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    session.flash("FamilyMart_CatalogEdit", {
      success: false,
    });

    const path = alias
      ? createPath({
          route: ERoutes.AdminCatalogEdit,
          params: { alias },
        })
      : createPath({ route: ERoutes.AdminCatalogs });

    return redirect(path, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    const session = await getSession(request.headers.get("Cookie"));
    session.flash("FamilyMart_CatalogEdit", {
      success: false,
      formError,
      fieldErrors,
    });
    const path = alias
      ? createPath({
          route: ERoutes.AdminCatalogEdit,
          params: { alias },
        })
      : createPath({ route: ERoutes.AdminCatalogs });

    return redirect(path, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(createPath({ route: ERoutes.Login }));
  }

  const { alias } = params;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapParamsToDto({
    ...formValues,
  });

  try {
    const [attributesResponse, attributesByCatalogResponse, catalogDetailResponse, session] =
      await Promise.all([
        getAttributes(request, { params: formattedParams }),
        getAttributesByCatalog(request, { alias }),
        getCatalogDetail(request, { alias }),
        getSession(request.headers.get("Cookie")),
      ]);

    const cookieData = session.get("FamilyMart_CatalogEdit") || {
      success: true,
    };

    if (
      attributesResponse.success &&
      attributesByCatalogResponse.success &&
      catalogDetailResponse.success
    ) {
      return json(
        {
          attributes: attributesResponse.data,
          attributesByCatalog: attributesByCatalogResponse.data,
          catalog: catalogDetailResponse.data,
          ...cookieData,
          title: t("routes.titles.catalogEdit"),
        },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    // @ts-ignore
    const fieldErrors = getInputErrors<keyof TForm>(
      catalogDetailResponse,
      Object.values(EFormFields),
    );

    return badRequest({ fieldErrors, success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.catalogEdit") || "Catalog editing" }];
  }
  return [{ title: data?.title || "Catalog editing" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.catalogEdit"),
  },
};

export default function CatalogEditRoute() {
  const data = useLoaderData<TLoaderData>();

  return (
    <CatalogEdit
      attributes={data.attributes}
      attributesByCatalog={data.attributesByCatalog}
      catalog={data.catalog}
      fieldErrors={data.fieldErrors}
      formError={data.formError}
      success={data.success}
    />
  );
}

export function links() {
  return [...catalogEditLinks()];
}
