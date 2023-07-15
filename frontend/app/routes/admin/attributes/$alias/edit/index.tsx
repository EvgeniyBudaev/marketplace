import {inputFromForm} from "remix-domains";
import {json, redirect} from "@remix-run/node";
import type {ActionArgs, LoaderArgs, MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {badRequest} from "remix-utils";
import i18next from "i18next";
import {EPermissions, ERoutes} from "~/enums";
import {
  AttributeEdit,
  attributeEditLinks,
  EFormFields,
} from "~/pages/Admin/Attributes/AttributeEdit";
import type {TForm} from "~/pages/Admin/Attributes/AttributeEdit";
import {
  addSelectableValue,
  deleteSelectableValue,
  EAttributeAction,
  editAttribute,
  editSelectableValue,
  ESelectableValueAction,
  getAttributeDetail,
} from "~/shared/api/attributes";
import {getInputErrors, getResponseError} from "~/shared/domain";
import {
  mapParamsAddSelectableValueToDto,
  mapParamsDeleteSelectableValueToDto,
  mapParamsEditAttributeToDto,
  mapParamsEditSelectableValueToDto,
} from "~/shared/api/attributes/utils";
import {commitSession, getCsrfSession, getSession} from "~/shared/session";
import {getStoreFixedT} from "~/shared/store";
import {checkCSRFToken, checkRequestPermission, createPath} from "~/utils";

export const action = async (args: ActionArgs) => {
  const {params, request} = args;
  const {alias = ""} = params;

  const [csrfSession, formValues, t, session] = await Promise.all([
    getCsrfSession(request),
    inputFromForm(request),
    getStoreFixedT({request}),
    getSession(request.headers.get("Cookie")),
  ]);

  const csrfToken = formValues.csrf;
  const checkCsrf = checkCSRFToken({csrfToken, session: csrfSession, t});
  if (checkCsrf?.error) return checkCsrf.error;

  const _method = formValues?._method ?? "";

  try {
    if (_method === ESelectableValueAction.AddSelectableValue) {
      const {csrf, _method, ...data} = formValues;
      const formData = mapParamsAddSelectableValueToDto(data);
      const response = await addSelectableValue(request, formData);

      if (response.success) {
        return {success: true};
      }

      const fieldErrors = getInputErrors<keyof TForm>(response, Object.values(EFormFields));
      return badRequest({fieldErrors, success: false});
    }

    if (_method === ESelectableValueAction.DeleteSelectableValue) {
      const {csrf, _method, ...data} = formValues;
      const formData = mapParamsDeleteSelectableValueToDto(data);
      const response = await deleteSelectableValue(request, formData);

      if (response.success) {
        return {success: true};
      }

      const fieldErrors = getInputErrors<keyof TForm>(response, Object.values(EFormFields));
      return badRequest({fieldErrors, success: false});
    }

    if (_method === ESelectableValueAction.EditSelectableValue) {
      const {csrf, _method, ...data} = formValues;
      const formData = mapParamsEditSelectableValueToDto(data);
      const response = await editSelectableValue(request, formData);

      if (response.success) {
        return {success: true};
      }

      const fieldErrors = getInputErrors<keyof TForm>(response, Object.values(EFormFields));
      return badRequest({fieldErrors, success: false});
    }

    if (_method === EAttributeAction.EditAttribute) {
      const {csrf, _method, ...data} = formValues;
      const formattedData = mapParamsEditAttributeToDto(data);
      const response = await editAttribute(request, formattedData);

      if (response.success) {
        session.flash("FamilyMart_AttributeEdit", {
          success: true,
        });


        return redirect(
          createPath({
            route: ERoutes.AdminAttributeEdit,
            params: {alias},
          }),
          {
            headers: {
              "Set-Cookie": await commitSession(session),
            },
          },
        );
      }

      session.flash("FamilyMart_AttributeEdit", {
        success: false,
      });

      return redirect(
        createPath({
          route: ERoutes.AdminAttributeEdit,
          params: {alias},
        }),
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        });
    }
  } catch (error) {
    const errorResponse = error as Response;
    const {message: formError, fieldErrors} = (await getResponseError(errorResponse)) ?? {};
    const session = await getSession(request.headers.get("Cookie"));
    session.flash("FamilyMart_AttributeEdit", {
      success: false,
      formError,
      fieldErrors,
    });
    const path = alias
      ? createPath({
        route: ERoutes.AdminAttributeEdit,
        params: {alias},
      })
      : ERoutes.AdminAttributes;

    return redirect(path, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export const loader = async (args: LoaderArgs) => {
  const {params, request} = args;
  const {alias} = params;

  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({request}),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

  try {
    const response = await getAttributeDetail(request, {alias});

    if (response.success) {
      return json({
        attribute: response.data,
        success: true,
        title: t("routes.titles.attributeEdit"),
      });
    }

    const fieldErrors = getInputErrors<keyof TForm>(response, Object.values(EFormFields));
    return badRequest({fieldErrors, success: false});
  } catch (error) {
    const errorResponse = error as Response;
    const {message: formError, fieldErrors} = (await getResponseError(errorResponse)) ?? {};
    return badRequest({success: false, formError, fieldErrors});
  }
};

export const meta: MetaFunction = ({data}) => {
  if (typeof window !== "undefined") {
    return {title: i18next.t("routes.titles.attributeEdit") || "Editing an Attribute"};
  }
  return {title: data?.title || "Editing an Attribute"};
};

export default function AttributeEditRoute() {
  const data = useLoaderData<typeof loader>();

  return <AttributeEdit
    attribute={data.attribute}
    fieldErrors={data.fieldErrors}
    formError={data.formError}
    success={data.success}
  />;
}

export function links() {
  return [...attributeEditLinks()];
}
