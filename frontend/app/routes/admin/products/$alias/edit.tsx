import { inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { EFormFields, ProductEdit, productEditLinks } from "~/pages/Admin/Products/ProductEdit";
import type { TForm } from "~/pages/Admin/Products/ProductEdit";
import { getAttributesByCatalog } from "~/shared/api/attributes";
import type { TAttributesByCatalog } from "~/shared/api/attributes";
import { getCatalogs } from "~/shared/api/catalogs";
import type { TCatalogs } from "~/shared/api/catalogs";
import { editProduct, getAdminProductDetail } from "~/shared/api/products";
import type { TAdminProductDetail } from "~/shared/api/products";
import { mapProductsToDto } from "~/shared/api/products/utils";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { commitSession, getCsrfSession, getSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import { checkCSRFToken, checkRequestPermission, createPath } from "~/utils";
import { TBaseRouteHandle } from "~/types";

type TLoaderData = {
  attributesByCatalog: TAttributesByCatalog;
  catalogs: TCatalogs;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  product: TAdminProductDetail;
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

  const formattedParams = mapProductsToDto({
    ...formData,
  });

  try {
    const [productDetailResponse, catalogsResponse, session] = await Promise.all([
      editProduct(request, formData),
      getCatalogs(request, { params: formattedParams }),
      getSession(request.headers.get("Cookie")),
    ]);

    if (productDetailResponse.success && catalogsResponse.success) {
      session.flash("FamilyMart_ProductEdit", {
        success: true,
      });

      const cookieData = session.get("FamilyMart_ProductEdit") || {
        success: true,
      };

      const attributesByCatalogResponse = await getAttributesByCatalog(request, {
        alias: productDetailResponse.data.catalogAlias,
      });

      if (attributesByCatalogResponse.success) {
        return json(
          {
            attributesByCatalog: attributesByCatalogResponse.data,
            catalogs: catalogsResponse.data,
            product: productDetailResponse.data,
            ...cookieData,
            title: t("routes.titles.productEdit"),
          },
          {
            headers: {
              "Set-Cookie": await commitSession(session),
            },
          },
        );
      }
    }

    session.flash("FamilyMart_ProductEdit", {
      success: false,
    });

    const path = alias
      ? createPath({
          route: ERoutes.AdminProductEdit,
          params: { alias },
        })
      : createPath({ route: ERoutes.AdminProducts });

    return redirect(path, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    const session = await getSession(request.headers.get("Cookie"));
    session.flash("FamilyMart_ProductEdit", {
      success: false,
      formError,
      fieldErrors,
    });
    const path = alias
      ? createPath({
          route: ERoutes.AdminProductEdit,
          params: { alias },
        })
      : ERoutes.AdminProducts;

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
    return redirect(ERoutes.Login);
  }

  const { alias } = params;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapProductsToDto({
    ...formValues,
  });

  try {
    const [productDetailResponse, catalogsResponse, session] = await Promise.all([
      getAdminProductDetail(request, { alias }),
      getCatalogs(request, { params: formattedParams }),
      getSession(request.headers.get("Cookie")),
    ]);

    const cookieData = session.get("FamilyMart_ProductEdit") || {
      success: true,
    };

    if (productDetailResponse.success && catalogsResponse.success) {
      const attributesByCatalogResponse = await getAttributesByCatalog(request, {
        alias: productDetailResponse.data.catalogAlias,
      });

      if (attributesByCatalogResponse.success) {
        return json(
          {
            attributesByCatalog: attributesByCatalogResponse.data,
            catalogs: catalogsResponse.data,
            product: productDetailResponse.data,
            ...cookieData,
            title: t("routes.titles.productEdit"),
          },
          {
            headers: {
              "Set-Cookie": await commitSession(session),
            },
          },
        );
      }
    }

    // @ts-ignore
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

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.productEdit") || "Product editing" }];
  }
  return [{ title: data?.title || "Product editing" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.productEdit"),
  },
};

export default function ProductEditRoute() {
  const data = useLoaderData<TLoaderData>();

  return (
    <ProductEdit
      attributesByCatalog={data.attributesByCatalog}
      catalogs={data.catalogs}
      fieldErrors={data.fieldErrors}
      formError={data.formError}
      product={data.product}
      success={data.success}
    />
  );
}

export function links() {
  return [...productEditLinks()];
}
