import i18next from "i18next";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { EPermissions, ERoutes } from "~/enums";
import { EFormFields, OrderEdit, orderEditLinks } from "~/pages/Admin/Orders/OrderEdit";
import type { TForm } from "~/pages/Admin/Orders/OrderEdit";
import { getOrderDetail } from "~/shared/api/orders";
import type { TOrderDetail } from "~/shared/api/orders";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { commitSession, getSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import type { TBaseRouteHandle, TDomainErrors } from "~/types";
import { checkRequestPermission, createPath } from "~/utils";

type TLoaderData = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  order: TOrderDetail;
  success?: boolean;
  title?: string;
};

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(createPath({ route: ERoutes.Login }));
  }

  const { id = "" } = params;

  try {
    const [orderResponse, session] = await Promise.all([
      getOrderDetail(request, { id }),
      getSession(request.headers.get("Cookie")),
    ]);

    const cookieData = session.get("FamilyMart_OrderEdit") || {
      success: true,
    };

    if (orderResponse.success) {
      return json(
        {
          order: orderResponse.data,
          ...cookieData,
          title: t("routes.titles.orderEdit"),
        },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    // @ts-ignore
    const fieldErrors = getInputErrors<keyof TForm>(orderResponse, Object.values(EFormFields));

    return badRequest({ fieldErrors, success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.orderEdit") || "Order editing" }];
  }
  return [{ title: data?.title || "Order editing" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.orderEdit"),
  },
};

export default function OrderEditRoute() {
  const data = useLoaderData<TLoaderData>();

  return (
    <OrderEdit
      fieldErrors={data.fieldErrors}
      formError={data.formError}
      order={data.order}
      success={data.success}
    />
  );
}

export function links() {
  return [...orderEditLinks()];
}
