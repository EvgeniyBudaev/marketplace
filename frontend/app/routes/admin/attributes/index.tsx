import { inputFromForm, inputFromSearch } from "remix-domains";
import { json } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { Attributes, attributesLinks } from "~/pages/Admin/Attributes";
import { deleteAttribute, EAttributeAction, getAttributes } from "~/shared/api/attributes";
import { mapParamsToDto } from "~/shared/api/attributes/utils";
import { getResponseError } from "~/shared/domain";
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

export default function AttributesRoute() {
  const { attributes } = useLoaderData<typeof loader>();

  return <Attributes attributes={attributes} />;
}

export function links() {
  return [...attributesLinks()];
}
