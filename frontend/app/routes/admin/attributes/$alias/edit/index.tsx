import { inputFromSearch } from "remix-domains";
import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  AttributeEdit,
  attributeEditLinks,
  EFormFields,
} from "~/pages/Admin/Attributes/AttributeEdit";
import type { TForm } from "~/pages/Admin/Attributes/AttributeEdit";
import { getAttributeDetail } from "~/shared/api/attributes";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { badRequest } from "remix-utils";

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const { alias } = params;

  try {
    const response = await getAttributeDetail(request, { alias });

    if (response.success) {
      console.log("[OK]");
      return json({
        attribute: response.data,
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

export default function AttributeEditRoute() {
  const { attribute } = useLoaderData<typeof loader>();

  return <AttributeEdit attribute={attribute} />;
}

export function links() {
  return [...attributeEditLinks()];
}
