import i18next from "i18next";
import { json, redirect } from "@remix-run/node";
import type {
  LoaderFunctionArgs,
  MetaFunction,
  ActionFunctionArgs,
} from "@remix-run/node";
import { inputFromForm } from "remix-domains";
import { useLoaderData } from "@remix-run/react";
import { ERoutes } from "#app/enums";
import { EFormFields, shippingLinks } from "#app/pages/Shipping";
import type { TForm } from "#app/pages/Shipping";
import { YMap } from "#app/pages/Shipping/YMap";
import { getCartSession } from "#app/shared/api/cart";
import { editShipping, getShipping } from "#app/shared/api/shipping";
import type { TShipping } from "#app/shared/api/shipping";
import { mapShippingToDto } from "#app/shared/api/shipping/utils";
import { getInputErrors } from "#app/shared/domain";
import { commitSession, getCsrfSession, getSession } from "#app/shared/session";
import { getStoreFixedT } from "#app/shared/store";
import type { TDomainErrors } from "#app/types";
import { checkCSRFToken, createPath, getResponseError } from "#app/utils";

type TLoaderData = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  shipping: TShipping;
  success: boolean;
  title?: string;
  uuid: string;
};

export const action = async (args: ActionFunctionArgs) => {
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
        }
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
      }
    );
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } =
      (await getResponseError(errorResponse)) ?? {};
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
      }
    );
  }
};

export const loader = async (args: LoaderFunctionArgs) => {
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
        })
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
        }
      );
    }

    // @ts-ignore
    const fieldErrors = getInputErrors<keyof TForm>(
      shippingResponse,
      Object.values(EFormFields)
    );

    return json({ fieldErrors, success: false }, { status: 400 });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } =
      (await getResponseError(errorResponse)) ?? {};

    return json({ success: false, formError, fieldErrors }, { status: 400 });
  }
};

export const meta: MetaFunction = ({ data }) => {
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
