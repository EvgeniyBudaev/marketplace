import { inputFromForm, inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "i18next";
import { EPermissions, ERoutes } from "#app/enums";
import { Attributes, attributesLinks } from "#app/pages/Admin/Attributes";
import {
  deleteAttribute,
  EAttributeAction,
  getAttributes,
} from "#app/shared/api/attributes";
import type { TAttributes } from "#app/shared/api/attributes";
import { mapParamsToDto } from "#app/shared/api/attributes/utils";
import { getResponseError } from "#app/shared/domain";
import { getStoreFixedT } from "#app/shared/store";
import type { TDomainErrors } from "#app/types";
import { checkRequestPermission, createPath } from "#app/utils";

type TLoaderData = {
  attributes: TAttributes;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success?: boolean;
  title?: string;
};

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;
  const { _method, alias } = await inputFromForm(request);

  try {
    if (_method === EAttributeAction.DeleteAttribute) {
      const response = await deleteAttribute(request, { alias });

      if (response.success) {
        return { success: true };
      }

      return json({ success: false }, { status: 400 });
    }
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } =
      (await getResponseError(errorResponse)) ?? {};
    console.log("[ERROR] ", error);
    console.log("[fieldErrors] ", fieldErrors);
    console.log("[formError] ", formError);

    return json({ success: false, formError, fieldErrors }, { status: 400 });
  }
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(createPath({ route: ERoutes.Login }));
  }

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
        title: t("routes.titles.attributes"),
      });
    }

    return json({ success: false }, { status: 400 });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } =
      (await getResponseError(errorResponse)) ?? {};

    return json({ success: false, formError, fieldErrors }, { status: 400 });
  }
};

export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.attributes") || "Attributes" }];
  }
  return [{ title: data?.title || "Attributes" }];
};

export default function AttributesIndexRoute() {
  const data = useLoaderData<TLoaderData>();

  return <Attributes attributes={data.attributes} />;
}

export function links() {
  return [...attributesLinks()];
}
