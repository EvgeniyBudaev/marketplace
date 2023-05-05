import { inputFromForm, inputFromSearch } from "remix-domains";
import { badRequest } from "remix-utils";
import {json, redirect} from "@remix-run/node";
import type { ActionArgs, LoaderArgs , MetaFunction} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { CatalogAdd, catalogAddLinks, EFormFields } from "~/pages/Admin/Catalogs/CatalogAdd";
import type { TForm } from "~/pages/Admin/Catalogs/CatalogAdd";
import { addCatalog, CatalogsApi } from "~/shared/api/catalogs";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { mapParamsToDto } from "~/shared/api/attributes/utils";
import { getAttributes } from "~/shared/api/attributes";
import {getStoreFixedT} from "~/shared/store";
import { checkRequestPermission, createPath } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  const formattedParams = CatalogsApi.mapAddCatalogToDto(formValues);
  console.log("[catalog add formattedParams] ", formattedParams);

  try {
    const response = await addCatalog(request, formattedParams);
    console.log("[response.success]", response.success);

    if (response.success) {
      console.log("[OK]");
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
  const { request } = args;
  const [t, isPermissions] = await Promise.all([getStoreFixedT({request}), checkRequestPermission(request, [EPermissions.Administrator])]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapParamsToDto({
    ...formValues,
  });

  try {
    const response = await getAttributes(request, { params: formattedParams });

    if (response.success) {
      return json({
        attributes: response.data,
        success: true,
        title: t("routes.titles.catalogAdd"),
      });
    }

    return badRequest({ success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const meta: MetaFunction = () => {
  return { title: i18next.t("routes.titles.catalogAdd") || "Adding a catalog" };
};

export default function CatalogAddRoute() {
  const data = useLoaderData<typeof loader>();

  return <CatalogAdd attributes={data.attributes} />;
}

export function links() {
  return [...catalogAddLinks()];
}
