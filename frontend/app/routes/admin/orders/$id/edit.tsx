import i18next from "i18next";
import { inputFromForm } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction, ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { EPermissions, ERoutes } from "~/enums";
import { EFormFields, OrderEdit, orderEditLinks } from "~/pages/Admin/Orders/OrderEdit";
import type { TForm } from "~/pages/Admin/Orders/OrderEdit";
import { editOrder, getOrderDetail } from "~/shared/api/orders";
import type { TOrderDetail } from "~/shared/api/orders";
import { mapParamsEditOrderToDto } from "~/shared/api/orders/utils";
import { getInputErrors, getResponseError } from "~/shared/domain";
import { commitSession, getCsrfSession, getSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import type { TBaseRouteHandle, TDomainErrors } from "~/types";
import { checkCSRFToken, checkRequestPermission, createPath } from "~/utils";

type TLoaderData = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  id: string;
  order: TOrderDetail;
  success?: boolean;
  title?: string;
};

export const action = async (args: ActionArgs) => {
  const { params, request } = args;
  const { id = "" } = params;

  const [csrfSession, formValues, t, session] = await Promise.all([
    getCsrfSession(request),
    inputFromForm(request),
    getStoreFixedT({ request }),
    getSession(request.headers.get("Cookie")),
  ]);

  const csrfToken = formValues.csrf;
  const checkCsrf = checkCSRFToken({ csrfToken, session: csrfSession, t });
  if (checkCsrf?.error) return checkCsrf.error;

  const { csrf, _method, ...data } = formValues;
  const formattedData = mapParamsEditOrderToDto(data);

  try {
    const response = await editOrder(request, formattedData);
    console.log("response.success: ", response.success);
    if (response.success) {
      session.flash("FamilyMart_AdminOrderEdit", {
        success: true,
      });

      return redirect(
        createPath({
          route: ERoutes.AdminOrderEdit,
          params: { id },
        }),
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    session.flash("FamilyMart_AdminOrderEdit", {
      success: false,
    });

    return redirect(
      createPath({
        route: ERoutes.AdminOrderEdit,
        params: { id },
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
    session.flash("FamilyMart_AdminOrderEdit", {
      success: false,
      formError,
      fieldErrors,
    });
    const path = id
      ? createPath({
          route: ERoutes.AdminOrderEdit,
          params: { id },
        })
      : createPath({ route: ERoutes.AdminOrders });

    return redirect(path, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
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

    const cookieData = session.get("FamilyMart_AdminOrderEdit") || {
      success: true,
    };

    if (orderResponse.success) {
      return json(
        {
          id,
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
      id={data.id}
      order={data.order}
      success={data.success}
    />
  );
}

export function links() {
  return [...orderEditLinks()];
}
