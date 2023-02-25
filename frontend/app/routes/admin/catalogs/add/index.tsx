import { inputFromForm, inputFromSearch } from "remix-domains";
import { badRequest } from "remix-utils";
import { json, LoaderArgs } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { CatalogAdd, catalogAddLinks, EFormFields } from "~/pages/Admin/Catalogs/CatalogAdd";
import type { TForm } from "~/pages/Admin/Catalogs/CatalogAdd";
import { addCatalog, CatalogsApi } from "~/shared/api/catalogs";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { mapParamsToDto } from "~/shared/api/attributes/utils";
import { getAttributes } from "~/shared/api/attributes";
import { useLoaderData } from "@remix-run/react";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  const formattedParams = CatalogsApi.mapAddCatalogToDto(formValues);

  try {
    const response = await addCatalog(request, formattedParams);
    console.log("[response.success]", response.success);

    if (response.success) {
      console.log("[OK]");
      return json({
        catalog: response.data,
        success: true,
      });
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
      });
    }
    return badRequest({ success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    return badRequest({ success: false, formError, fieldErrors });
  }
};

export default function CatalogAddRoute() {
  const data = useLoaderData<typeof loader>();
  return <CatalogAdd attributes={data.attributes} />;
}

export function links() {
  return [...catalogAddLinks()];
}
