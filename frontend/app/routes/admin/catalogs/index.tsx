import { inputFromForm, inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { Catalogs, catalogsLinks } from "~/pages/Admin/Catalogs";
import { deleteCatalog, ECatalogAction, getCatalogs } from "~/shared/api/catalogs";
import type { TCatalogs } from "~/shared/api/catalogs";
import { mapCatalogsToDto } from "~/shared/api/catalogs/utils";
import { getResponseError } from "~/shared/domain";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import { checkRequestPermission, createPath, internalError } from "~/utils";

type TLoaderData = {
  catalogs: TCatalogs;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success?: boolean;
  title?: string;
};

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;
  const { _method, alias } = await inputFromForm(request);

  try {
    if (_method === ECatalogAction.DeleteCatalog) {
      const response = await deleteCatalog(request, { alias });

      if (response.success) {
        return json({
          success: true,
        });
      }

      return json({ success: false });
    }
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return json({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(createPath({ route: ERoutes.Login }));
  }

  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapCatalogsToDto({
    ...formValues,
  });
  const response = await getCatalogs(request, { params: formattedParams });

  if (!response.success) {
    throw internalError();
  }

  return json({
    catalogs: response.data,
    title: t("routes.titles.catalogs"),
  });
};

export const meta: MetaFunction = ({ data }: any) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.catalogs") || "Catalogs" }];
  }
  return [{ title: data?.title || "Catalogs" }];
};

export default function CatalogsIndexRoute() {
  const data = useLoaderData<TLoaderData>();

  return <Catalogs catalogs={data.catalogs} />;
}

export function links() {
  return [...catalogsLinks()];
}
