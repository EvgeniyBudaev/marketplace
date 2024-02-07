import { inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { ProductAdd, productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { getCatalogs } from "~/shared/api/catalogs";
import type { TCatalogs } from "~/shared/api/catalogs";
import { addProduct } from "~/shared/api/products";
import { mapProductsToDto } from "~/shared/api/products/utils";
import { getResponseError } from "~/shared/domain";
import { commitSession, getCsrfSession, getSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import type { TBaseRouteHandle, TDomainErrors } from "~/types";
import { checkCSRFToken, checkRequestPermission, createPath } from "~/utils";

type TLoaderData = {
  catalogs: TCatalogs;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success?: boolean;
  title?: string;
};

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const [csrfSession, formData, t, session] = await Promise.all([
    getCsrfSession(request),
    request.formData(),
    getStoreFixedT({ request }),
    getSession(request.headers.get("Cookie")),
  ]);

  const csrfToken = formData.get("csrf") as string | null;
  const checkCsrf = checkCSRFToken({ csrfToken, session: csrfSession, t });
  if (checkCsrf?.error) return checkCsrf.error;

  try {
    const response = await addProduct(request, formData);

    if (response.success) {
      session.flash("FamilyMart_ProductAdd", {
        success: true,
      });

      return redirect(
        createPath({
          route: ERoutes.AdminProductEdit,
          params: { alias: response.data.alias },
        }),
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    session.flash("FamilyMart_ProductAdd", {
      success: false,
    });

    return redirect(
      createPath({
        route: ERoutes.AdminProductAdd,
      }),
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    const session = await getSession(request.headers.get("Cookie"));
    console.log("[errorResponse] ", errorResponse);
    session.flash("FamilyMart_ProductAdd", {
      success: false,
      formError,
      fieldErrors,
    });

    return redirect(
      createPath({
        route: ERoutes.AdminProductAdd,
      }),
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  }
};

export const loader = async (args: LoaderFunctionArgs) => {
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
  try {
    const catalogsResponse = await getCatalogs(request, { params: formattedParams });

    if (catalogsResponse.success) {
      return json({
        catalogs: catalogsResponse.data,
        success: true,
        title: t("routes.titles.productAdd"),
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
    return [{ title: i18next.t("routes.titles.productAdd") || "Product addition" }];
  }
  return [{ title: data?.title || "Product addition" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.productAdd"),
  },
};

export default function ProductAddRoute() {
  const data = useLoaderData<TLoaderData>();

  return (
    <ProductAdd
      catalogs={data.catalogs}
      fieldErrors={data.fieldErrors}
      formError={data.formError}
      success={data.success}
    />
  );
}

export function links() {
  return [...productAddLinks()];
}
