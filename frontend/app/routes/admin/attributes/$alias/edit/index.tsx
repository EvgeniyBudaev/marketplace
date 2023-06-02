import { inputFromForm } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
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
import { getCsrfSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import { checkCSRFToken, checkRequestPermission, createPath } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;

  const [csrfSession, formValues, t] = await Promise.all([
    getCsrfSession(request),
    inputFromForm(request),
    getStoreFixedT({ request }),
  ]);

  const csrfToken = formValues.csrf;
  const checkCsrf = checkCSRFToken({ csrfToken, session: csrfSession, t });
  if (checkCsrf?.error) return checkCsrf.error;

  const _method = formValues?._method ?? "";

  try {
    if (_method === ESelectableValueAction.AddSelectableValue) {
      const { _method, ...data } = formValues;
      const formData = mapParamsAddSelectableValueToDto(data);
      const response = await addSelectableValue(request, formData);

      if (response.success) {
        return { success: true };
      }

      return badRequest({ success: false });
    }

    if (_method === ESelectableValueAction.DeleteSelectableValue) {
      const { _method, ...data } = formValues;
      const formData = mapParamsDeleteSelectableValueToDto(data);
      const response = await deleteSelectableValue(request, formData);

      if (response.success) {
        return { success: true };
      }

      return badRequest({ success: false });
    }

    if (_method === ESelectableValueAction.EditSelectableValue) {
      const { _method, ...data } = formValues;
      const formData = mapParamsEditSelectableValueToDto(data);
      const response = await editSelectableValue(request, formData);

      if (response.success) {
        return { success: true };
      }

      return badRequest({ success: false });
    }

    if (_method === EAttributeAction.EditAttribute) {
      const { _method, ...data } = formValues;
      const formData = mapParamsEditAttributeToDto(data);
      const response = await editAttribute(request, formData);

      if (response.success) {
        return redirect(
          createPath({
            route: ERoutes.AdminAttributes,
          }),
        );
      }

      const fieldErrors = getInputErrors<keyof TForm>(response, Object.values(EFormFields));

      return badRequest({ fieldErrors, success: false });
    }
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;

  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

  const { alias } = params;

  try {
    const response = await getAttributeDetail(request, { alias });

    if (response.success) {
      return json({
        attribute: response.data,
        success: true,
        title: t("routes.titles.attributeEdit"),
      });
    }

    const fieldErrors = getInputErrors<keyof TForm>(response, Object.values(EFormFields));

    return badRequest({ fieldErrors, success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return { title: i18next.t("routes.titles.attributeEdit") || "Editing an Attribute" };
  }
  return { title: data?.title || "Editing an Attribute" };
};

export default function AttributeEditRoute() {
  const { attribute } = useLoaderData<typeof loader>();

  return <AttributeEdit attribute={attribute} />;
}

export function links() {
  return [...attributeEditLinks()];
}
