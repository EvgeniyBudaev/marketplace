import { inputFromForm } from "remix-domains";
import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import {
  AttributeEdit,
  attributeEditLinks,
  EFormFields,
} from "~/pages/Admin/Attributes/AttributeEdit";
import type { TForm } from "~/pages/Admin/Attributes/AttributeEdit";
import { editAttribute, getAttributeDetail } from "~/shared/api/attributes";
import { getInputErrors, getResponseError } from "~/shared/domain";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("formValues: ", formValues);
  const formData = {
    ...formValues,
    id: Number(formValues.id),
    filter: Boolean(formValues.filter),
    selectable:
      formValues.selectable && typeof formValues.selectable === "string"
        ? JSON.parse(formValues.selectable.trim())
        : formValues.selectable,
  };
  console.log("formData: ", formData);

  try {
    const response = await editAttribute(request, formData);
    console.log("[response.success]", response.success);

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
