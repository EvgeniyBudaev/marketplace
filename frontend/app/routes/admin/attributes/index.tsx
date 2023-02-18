import { inputFromForm, inputFromSearch } from "remix-domains";
import { json } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Attributes, attributesLinks } from "~/pages/Admin/Attributes";
import { deleteAttribute, EAttributeAction, getAttributes } from "~/shared/api/attributes";
import { mapParamsToDto } from "~/shared/api/attributes/utils";
import { internalError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const { _method, alias } = await inputFromForm(request);
  if (_method === EAttributeAction.DeleteAttribute) {
    const response = await deleteAttribute(request, { alias });
    if (!response.success) {
      throw internalError();
    }
  }
  return null;
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  const formattedParams = mapParamsToDto({
    ...formValues,
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
