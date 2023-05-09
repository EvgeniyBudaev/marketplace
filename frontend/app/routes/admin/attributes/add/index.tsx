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
import { getStoreFixedT } from "~/shared/store";
import { checkRequestPermission, createPath } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("formValues: ", formValues);
  const formData = {
    ...formValues,
    selectable:
      formValues.selectable && typeof formValues.selectable === "string"
        ? JSON.parse(formValues.selectable.trim())
        : formValues.selectable,
  };
  console.log("formData: ", formData);

  try {
    const response = await addAttribute(request, formData);
    console.log("[response.success]", response.success);

    if (response.success) {
      console.log("[OK]");
      return redirect(
        createPath({
          route: ERoutes.AdminAttributes,
        }),
      );
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

let hydration = 0;
export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined" && hydration) {
    return { title: i18next.t("routes.titles.attributeAdd") || "Adding an attribute" };
  }
  hydration++;
  return { title: data?.title || "Adding an attribute" };
};

export default function AttributeAddRoute() {
  return <AttributeAdd />;
}

export function links() {
  return [...attributeAddLinks()];
}
