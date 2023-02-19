import {inputFromForm, inputFromSearch} from "remix-domains";
import { json} from "@remix-run/node";
import type { LoaderArgs ,ActionArgs} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {badRequest} from "remix-utils";
import { Catalogs, catalogsLinks } from "~/pages/Admin/Catalogs";
import {deleteCatalog, ECatalogAction, getCatalogs} from "~/shared/api/catalogs";
import { mapParamsToDto } from "~/shared/api/catalogs/utils";
import {getResponseError} from "~/shared/domain";
import { internalError } from "~/utils";

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
}

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);

  const formattedParams = mapParamsToDto({
    ...formValues,
  });
  console.log("[catalogs formattedParams: ] ", formattedParams);
  const response = await getCatalogs(request, { params: formattedParams });

  if (!response.success) {
    throw internalError();
  }
  console.log("response.data: ", response.data);
  return json({
    catalogs: response.data,
  });
};

export default function CatalogsRoute() {
  const data = useLoaderData<typeof loader>();

  return <Catalogs catalogs={data.catalogs} />;
}

export function links() {
  return [...catalogsLinks()];
}
