import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Catalogs, catalogsLinks } from "~/pages/Admin/Catalogs";
import { getCatalogs } from "~/shared/api/catalogs";
import { internalError } from "~/utils";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const catalogsResponse = await getCatalogs(request);

  if (!catalogsResponse.success) {
    throw internalError();
  }

  return json({
    catalogs: catalogsResponse.data,
  });
};

export default function CatalogsRoute() {
  const data = useLoaderData<typeof loader>();

  return <Catalogs catalogs={data.catalogs} />;
}

export function links() {
  return [...catalogsLinks()];
}
