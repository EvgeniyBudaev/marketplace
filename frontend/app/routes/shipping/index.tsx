import i18next from "i18next";
import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction, ActionArgs } from "@remix-run/node";
import { inputFromForm } from "remix-domains";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { ERoutes } from "~/enums";
import { EFormFields, shippingLinks } from "~/pages/Shipping";
import type { TForm } from "~/pages/Shipping";
import { YMap } from "~/pages/Shipping/YMap";
import { getCartSession } from "~/shared/api/cart";
import { editShipping, getShipping } from "~/shared/api/shipping";
import type { TShipping } from "~/shared/api/shipping";
import { mapShippingToDto } from "~/shared/api/shipping/utils";
import { getInputErrors } from "~/shared/domain";
import { commitSession, getCsrfSession, getSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import type { TDomainErrors } from "~/types";
import { checkCSRFToken, createPath, getResponseError } from "~/utils";

type TLoaderData = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  shipping: TShipping;
  success: boolean;
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

  const formattedParams = mapShippingToDto(formValues as any);

  try {
    const response = await editShipping(request, formattedParams);

    if (response.success) {
      session.flash("FamilyMart_Shipping", {
        success: true,
      });

      return redirect(
        createPath({
          route: ERoutes.Recipient,
        }),
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    session.flash("FamilyMart_Shipping", {
      success: false,
    });

    return redirect(
      createPath({
        route: ERoutes.Shipping,
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

    session.flash("FamilyMart_Shipping", {
      success: false,
      formError,
      fieldErrors,
    });

    return redirect(
      createPath({
        route: ERoutes.Shipping,
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

    const shippingResponse = await getShipping(request, { uuid });

    const cookieData = session.get("FamilyMart_Shipping") || {
      success: true,
    };

    if (shippingResponse.success) {
      return json(
        {
          shipping: shippingResponse.data,
          ...cookieData,
          title: t("routes.titles.shipping"),
          uuid: uuid as string,
        },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    // @ts-ignore
    const fieldErrors = getInputErrors<keyof TForm>(shippingResponse, Object.values(EFormFields));

    return badRequest({ fieldErrors, success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};

    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.shipping") || "Shipping" }];
  }
  return [{ title: data?.title || "Shipping" }];
};

export default function ShippingIndexRoute() {
  const data = useLoaderData<TLoaderData>();

  return (
    <YMap
      fieldErrors={data.fieldErrors}
      formError={data.formError}
      shipping={data.shipping}
      success={data.success}
      uuid={data.uuid}
    />
  );
}

export function links() {
  return [...shippingLinks()];
}
