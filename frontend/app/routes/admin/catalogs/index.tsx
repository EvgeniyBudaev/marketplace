import { inputFromForm, inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, ActionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { Catalogs, catalogsLinks } from "~/pages/Admin/Catalogs";
import { deleteCatalog, ECatalogAction, getCatalogs } from "~/shared/api/catalogs";
import { mapCatalogsToDto } from "~/shared/api/catalogs/utils";
import { getResponseError } from "~/shared/domain";
import { getStoreFixedT } from "~/shared/store";
import { checkRequestPermission, internalError } from "~/utils";

export const action = async (args: ActionArgs) => {
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

      return badRequest({ success: false });
    }
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderArgs) => {
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

let hydration = 0;
export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined" && hydration) {
    return { title: i18next.t("routes.titles.catalogs") || "Catalogs" };
  }
  hydration++;
  return { title: data?.title || "Catalogs" };
};

export default function CatalogsRoute() {
  const data = useLoaderData<typeof loader>();

  return <Catalogs catalogs={data.catalogs} />;
}

export function links() {
  return [...catalogsLinks()];
}
