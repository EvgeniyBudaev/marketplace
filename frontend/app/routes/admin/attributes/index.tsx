import { inputFromForm, inputFromSearch } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import i18next from "i18next";
import { EPermissions, ERoutes } from "~/enums";
import { Attributes, attributesLinks } from "~/pages/Admin/Attributes";
import { deleteAttribute, EAttributeAction, getAttributes } from "~/shared/api/attributes";
import type { TAttributes } from "~/shared/api/attributes";
import { mapParamsToDto } from "~/shared/api/attributes/utils";
import { getResponseError } from "~/shared/domain";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import { checkRequestPermission, createPath } from "~/utils";

type TLoaderData = {
  attributes?: TAttributes;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  success?: boolean;
  title?: string;
};

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const { _method, alias } = await inputFromForm(request);

  try {
    if (_method === EAttributeAction.DeleteAttribute) {
      const response = await deleteAttribute(request, { alias });

      if (response.success) {
        return { success: true };
      }

      return badRequest({ success: false });
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

    return badRequest({ success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.attributes") || "Attributes" }];
  }
  return [{ title: data?.title || "Attributes" }];
};

export default function AttributesRoute() {
  const data = useLoaderData<TLoaderData>();

  return <>{data.attributes ? <Attributes attributes={data.attributes} /> : null}</>;
}

export function links() {
  return [...attributesLinks()];
}
