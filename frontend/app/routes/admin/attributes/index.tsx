import { inputFromSearch } from "remix-domains";
import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Attributes, attributesLinks } from "~/pages/Admin/Attributes";
import { getAttributes } from "~/shared/api/attributes";
import { mapParamsToDto } from "~/shared/api/attributes/utils";
import { internalError } from "~/utils";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapParamsToDto({
    ...formValues,
    // sort: formValues.sort ?? "name_asc",
  });

  const response = await getAttributes(request, { params: formattedParams });

  if (!response.success) {
    throw internalError();
  }

  return json({
    attributes: response.data,
  });
};

export default function AttributesRoute() {
  const data = useLoaderData<typeof loader>();

  return <Attributes attributes={data.attributes} />;
}

export function links() {
  return [...attributesLinks()];
}
