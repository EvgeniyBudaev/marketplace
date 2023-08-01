import {inputFromSearch} from "remix-domains";
import {badRequest} from "remix-utils";
import {json, redirect} from "@remix-run/node";
import type {ActionArgs, LoaderArgs, MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import i18next from "i18next";
import {EPermissions, ERoutes} from "~/enums";
import {CatalogAdd, catalogAddLinks} from "~/pages/Admin/Catalogs/CatalogAdd";
import {addCatalog} from "~/shared/api/catalogs";
import {getResponseError} from "~/shared/domain";
import {mapParamsToDto} from "~/shared/api/attributes/utils";
import {getAttributes} from "~/shared/api/attributes";
import {commitSession, getCsrfSession, getSession} from "~/shared/session";
import {getStoreFixedT} from "~/shared/store";
import {checkCSRFToken, checkRequestPermission, createPath} from "~/utils";

export const action = async (args: ActionArgs) => {
  const {request} = args;

  const [csrfSession, formData, t, session] = await Promise.all([
    getCsrfSession(request),
    request.formData(),
    getStoreFixedT({request}),
    getSession(request.headers.get("Cookie")),
  ]);

  const csrfToken = formData.get("csrf") as string | null;
  const checkCsrf = checkCSRFToken({csrfToken, session: csrfSession, t});
  if (checkCsrf?.error) return checkCsrf.error;

  try {
    const response = await addCatalog(request, formData);


    if (response.success) {
      session.flash("FamilyMart_CatalogAdd", {
        success: true,
      });

      return redirect(
        createPath({
          route: ERoutes.AdminCatalogs,
        }),
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    session.flash("FamilyMart_CatalogAdd", {
      success: false,
    });

    return redirect(
      createPath({
        route: ERoutes.AdminCatalogAdd,
      }),
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
  } catch (error) {
    const errorResponse = error as Response;
    const {message: formError, fieldErrors} = (await getResponseError(errorResponse)) ?? {};
    const session = await getSession(request.headers.get("Cookie"));
    session.flash("FamilyMart_CatalogAdd", {
      success: false,
      formError,
      fieldErrors,
    });

    return redirect(
      createPath({
        route: ERoutes.AdminCatalogAdd,
      }),
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
  }
};

export const loader = async (args: LoaderArgs) => {
  const {request} = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({request}),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapParamsToDto({
    ...formValues,
  });

  try {
    const response = await getAttributes(request, {params: formattedParams});

    if (response.success) {
      return json({
        attributes: response.data,
        success: true,
        title: t("routes.titles.catalogAdd"),
      });
    }

    return badRequest({success: false});
  } catch (error) {
    const errorResponse = error as Response;
    const {message: formError, fieldErrors} = (await getResponseError(errorResponse)) ?? {};

    return badRequest({success: false, formError, fieldErrors});
  }
};

// export const meta: MetaFunction = ({data}) => {
//   if (typeof window !== "undefined") {
//     return {title: i18next.t("routes.titles.catalogAdd") || "Adding a catalog"};
//   }
//   return {title: data?.title || "Adding a catalog"};
// };

export default function CatalogAddRoute() {
  const data = useLoaderData<typeof loader>();

  return <CatalogAdd
    attributes={data.attributes}
    fieldErrors={data.fieldErrors}
    formError={data.formError}
    success={data.success}
  />;
}

export function links() {
  return [...catalogAddLinks()];
}
