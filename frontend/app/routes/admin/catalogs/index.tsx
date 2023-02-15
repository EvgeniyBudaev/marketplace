import { inputFromSearch } from "remix-domains";
import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Catalogs, catalogsLinks } from "~/pages/Admin/Catalogs";
import { getCatalogs } from "~/shared/api/catalogs";
import { mapParamsToDto } from "~/shared/api/catalogs/utils";
import { internalError } from "~/utils";

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
