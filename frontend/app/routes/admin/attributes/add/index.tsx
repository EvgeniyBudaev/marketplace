import { inputFromForm } from "remix-domains";
import { badRequest } from "remix-utils";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import {
  AttributeAdd,
  attributeAddLinks,
  EFormFields,
} from "~/pages/Admin/Attributes/AttributeAdd";
import type { TForm } from "~/pages/Admin/Attributes/AttributeAdd";
import { addAttribute } from "~/shared/api/attributes";
import { getInputErrors, getResponseError } from "~/shared/domain";
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

  const formData = {
    ...formValues,
    selectable:
      formValues.selectable && typeof formValues.selectable === "string"
        ? JSON.parse(formValues.selectable.trim())
        : formValues.selectable,
  };

  try {
    const response = await addAttribute(request, formData);

    if (response.success) {
      return redirect(
        createPath({
          route: ERoutes.AdminAttributes,
        }),
      );
    }

    const fieldErrors = getInputErrors<keyof TForm>(response, Object.values(EFormFields));

    return badRequest({ fieldErrors, success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

  return json({
    title: t("routes.titles.attributeAdd"),
  });
};

export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return { title: i18next.t("routes.titles.attributeAdd") || "Adding an attribute" };
  }
  return { title: data?.title || "Adding an attribute" };
};

export default function AttributeAddRoute() {
  return <AttributeAdd />;
}

export function links() {
  return [...attributeAddLinks()];
}
