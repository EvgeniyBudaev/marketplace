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
import {
  addSelectableValue,
  deleteSelectableValue,
  EAttributeAction,
  editAttribute,
  editSelectableValue,
  ESelectableValueAction,
  getAttributeDetail,
} from "~/shared/api/attributes";
import { getInputErrors, getResponseError } from "~/shared/domain";
import {
  mapParamsAddSelectableValueToDto,
  mapParamsDeleteSelectableValueToDto,
  mapParamsEditAttributeToDto,
  mapParamsEditSelectableValueToDto,
} from "~/shared/api/attributes/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("formValues: ", formValues);
  const _method = formValues?._method ?? "";

  try {
    if (_method === ESelectableValueAction.AddSelectableValue) {
      const { _method, ...data } = formValues;
      const formData = mapParamsAddSelectableValueToDto(data);
      const response = await addSelectableValue(request, formData);
      if (response.success) {
        console.log("value add response.data: ", response.data);
        return { success: true };
      }
      return badRequest({ success: false });
    }

    if (_method === ESelectableValueAction.DeleteSelectableValue) {
      const { _method, ...data } = formValues;
      const formData = mapParamsDeleteSelectableValueToDto(data);
      const response = await deleteSelectableValue(request, formData);
      if (response.success) {
        console.log("value delete response.data: ", response.data);
        return { success: true };
      }
      return badRequest({ success: false });
    }

    if (_method === ESelectableValueAction.EditSelectableValue) {
      const { _method, ...data } = formValues;
      const formData = mapParamsEditSelectableValueToDto(data);
      console.log("value formData: ", formData);
      const response = await editSelectableValue(request, formData);
      console.log("[value response.success]", response.success);
      if (response.success) {
        console.log("value response.data: ", response.data);
        return { success: true };
      }
      return badRequest({ success: false });
    }

    if (_method === EAttributeAction.EditAttribute) {
      const { _method, ...data } = formValues;
      const formData = mapParamsEditAttributeToDto(data);
      console.log("formData: ", formData);
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
    }
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
