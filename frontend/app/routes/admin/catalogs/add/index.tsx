import { ActionArgs, json } from "@remix-run/node";
import { CatalogAdd, catalogAddLinks } from "~/pages/Admin/Catalogs/CatalogAdd";
import { inputFromForm } from "remix-domains";
import { addCatalog } from "~/shared/api/catalogs";
import { internalError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[CatalogAdd action formValues] ", formValues);

  const response = await addCatalog(request, formValues);

  if (!response.success) {
    throw internalError();
  }

  return json({
    catalog: response.data,
  });
};

export default function CatalogsRoute() {
  return <CatalogAdd />;
}

export function links() {
  return [...catalogAddLinks()];
}
