import i18next from "i18next";
import { inputFromForm } from "remix-domains";
import { badRequest } from "remix-utils";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { EPermissions, ERoutes } from "~/enums";
import { AttributeAdd, attributeAddLinks } from "~/pages/Admin/Attributes/AttributeAdd";
import { addAttribute } from "~/shared/api/attributes";
import { mapParamsAddAttributeToDto } from "~/shared/api/attributes/utils";
import { getResponseError } from "~/shared/domain";
import { commitSession, getCsrfSession, getSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import { checkCSRFToken, checkRequestPermission, createPath } from "~/utils";

type TLoaderData = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success?: boolean;
  title?: string;
};

export const action = async (args: ActionArgs) => {
  const { request } = args;

  const [csrfSession, formValues, t, session] = await Promise.all([
    getCsrfSession(request),
    inputFromForm(request),
    getStoreFixedT({ request }),
    getSession(request.headers.get("Cookie")),
  ]);

  const csrfToken = formValues.csrf;
  const checkCsrf = checkCSRFToken({ csrfToken, session: csrfSession, t });
  if (checkCsrf?.error) return checkCsrf.error;

  const { csrf, ...data } = formValues;
  const formattedData = mapParamsAddAttributeToDto(data);

  try {
    const response = await addAttribute(request, formattedData);

    if (response.success) {
      session.flash("FamilyMart_AttributeAdd", {
        success: true,
      });

      return redirect(
        createPath({
          route: ERoutes.AdminAttributes,
        }),
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    session.flash("FamilyMart_AttributeAdd", {
      success: false,
    });

    return redirect(
      createPath({
        route: ERoutes.AdminAttributeAdd,
      }),
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    const session = await getSession(request.headers.get("Cookie"));
    session.flash("FamilyMart_AttributeAdd", {
      success: false,
      formError,
      fieldErrors,
    });

    return redirect(
      createPath({
        route: ERoutes.AdminAttributeAdd,
      }),
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  }
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;

  try {
    const [t, isPermissions] = await Promise.all([
      getStoreFixedT({ request }),
      checkRequestPermission(request, [EPermissions.Administrator]),
    ]);

    if (!isPermissions) {
      return redirect(createPath({ route: ERoutes.Login }));
    }

    return json({
      success: true,
      title: t("routes.titles.attributeAdd"),
    });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.attributeAdd") || "Adding an attribute" }];
  }
  return [{ title: data?.title || "Adding an attribute" }];
};

export default function AttributeAddRoute() {
  const data = useLoaderData<TLoaderData>();

  return (
    <AttributeAdd
      fieldErrors={data.fieldErrors}
      formError={data.formError}
      success={data.success}
    />
  );
}

export function links() {
  return [...attributeAddLinks()];
}
