import { inputFromForm } from "remix-domains";
import { ActionArgs, json } from "@remix-run/node";
import { CatalogAdd, catalogAddLinks } from "~/pages/Admin/Catalogs/CatalogAdd";
import { addCatalog, CatalogsApi } from "~/shared/api/catalogs";
import { parseResponseError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  const formattedParams = CatalogsApi.mapAddCatalogToDto(formValues);

  try {
    const response = await addCatalog(request, formattedParams);
    console.log("response.success: ", response.success);

    if (response && response.success) {
      return json({
        catalog: response.data,
      });
    }

    return json(response);
  } catch (error) {
    return parseResponseError(error);
  }
};

export default function CatalogAddRoute() {
  return <CatalogAdd />;
}

export function links() {
  return [...catalogAddLinks()];
}
