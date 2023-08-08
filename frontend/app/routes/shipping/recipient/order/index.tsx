import i18next from "i18next";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction, ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";

import { ERoutes } from "~/enums";
import { Order, orderLinks } from "~/pages";
import { getCart, getCartSession } from "~/shared/api/cart";
import type { TCart } from "~/shared/api/cart";
import { getShipping } from "~/shared/api/shipping";
import type { TRecipient } from "~/shared/api/recipient";
import { getRecipient } from "~/shared/api/recipient/domain.server";
import type { TShipping } from "~/shared/api/shipping";
import { getResponseError } from "~/shared/domain";
import { commitSession, getCsrfSession, getSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import { checkCSRFToken, createPath } from "~/utils";
import { inputFromForm } from "remix-domains";
import { createOrder } from "~/shared/api/order";
import { mapOrderToDto } from "~/shared/api/order/utils";

type TLoaderData = {
  cart: TCart;
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  recipient: TRecipient;
  shipping: TShipping;
  success?: boolean;
  title?: string;
  uuid: string;
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

  const formattedParams = mapOrderToDto(formValues as any);

  try {
    const orderResponse = await createOrder(request, formattedParams);

    if (orderResponse.success) {
      session.flash("FamilyMart_Order", {
        success: true,
      });

      return redirect(
        createPath({
          route: ERoutes.Root,
        }),
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    session.flash("FamilyMart_Order", {
      success: false,
    });

    return redirect(
      createPath({
        route: ERoutes.Order,
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
    console.log("[errorResponse] ", errorResponse);
    session.flash("FamilyMart_Order", {
      success: false,
      formError,
      fieldErrors,
    });

    return redirect(
      createPath({
        route: ERoutes.Order,
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
    const [t, cartSession, session] = await Promise.all([
      getStoreFixedT({ request }),
      getCartSession(request),
      getSession(request.headers.get("Cookie")),
    ]);

    const cart = JSON.parse(cartSession || "{}");
    const uuid = cart?.uuid;

    if (!uuid) {
      return redirect(
        createPath({
          route: ERoutes.Cart,
        }),
      );
    }

    const [shippingResponse, recipientResponse, cartResponse] = await Promise.all([
      getShipping(request, { uuid }),
      getRecipient(request, { uuid }),
      getCart(request, { uuid }),
    ]);

    if (shippingResponse.success && recipientResponse.success && cartResponse.success) {
      return json(
        {
          cart: cartResponse.data,
          recipient: recipientResponse.data,
          shipping: shippingResponse.data,
          title: t("routes.titles.order"),
          uuid: uuid as string,
        },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
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
    return [{ title: i18next.t("routes.titles.order") || "Order" }];
  }
  return [{ title: data?.title || "Order" }];
};

export default function OrderRoute() {
  const data = useLoaderData<TLoaderData>();

  return (
    <Order
      cart={data.cart}
      fieldErrors={data.fieldErrors}
      formError={data.formError}
      shipping={data.shipping}
      success={data.success}
      recipient={data.recipient}
      uuid={data.uuid}
    />
  );
}

export function links() {
  return [...orderLinks()];
}
