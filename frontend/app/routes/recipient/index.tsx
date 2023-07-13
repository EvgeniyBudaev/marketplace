import i18next from "i18next";
import {json, redirect} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {inputFromForm} from "remix-domains";
import {badRequest} from "remix-utils";
import type {LoaderArgs, MetaFunction, ActionArgs} from "@remix-run/node";
import {ERoutes} from "~/enums";
import {EFormFields, Recipient, recipientLinks} from "~/pages";
import type {TForm} from "~/pages";
import {getUserSession} from "~/shared/api/auth";
import {getCartSession} from "~/shared/api/cart";
import {ediRecipient, getRecipient} from "~/shared/api/recipient/domain.server";
import {mapRecipientToDto} from "~/shared/api/recipient/utils";
import {getInputErrors} from "~/shared/domain";
import {commitSession, getCsrfSession, getSession} from "~/shared/session";
import {getStoreFixedT} from "~/shared/store";
import {checkCSRFToken, createPath, getResponseError} from "~/utils";

export const action = async (args: ActionArgs) => {
  const {request} = args;

  const [csrfSession, formValues, t, session] = await Promise.all([
    getCsrfSession(request),
    inputFromForm(request),
    getStoreFixedT({request}),
    getSession(request.headers.get("Cookie")),
  ]);

  const csrfToken = formValues.csrf;
  const checkCsrf = checkCSRFToken({csrfToken, session: csrfSession, t});
  if (checkCsrf?.error) return checkCsrf.error;

  const formattedParams = mapRecipientToDto(formValues as any);
  console.log("[formattedParams] ", formattedParams);
  try {
    const response = await ediRecipient(request, formattedParams);

    if (response.success) {
      session.flash("FamilyMart_Recipient", {
        success: true,
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

    session.flash("FamilyMart_Recipient", {
      success: false,
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
  } catch (error) {
    const errorResponse = error as Response;
    const {message: formError, fieldErrors} = (await getResponseError(errorResponse)) ?? {};
    const session = await getSession(request.headers.get("Cookie"));
    session.flash("FamilyMart_Recipient", {
      success: false,
      formError,
      fieldErrors,
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
};

export const loader = async (args: LoaderArgs) => {
  const {request} = args;

  try {
    const [t, session, userSession, cartSession] = await Promise.all([
      getStoreFixedT({request}),
      getSession(request.headers.get("Cookie")),
      getUserSession(request),
      getCartSession(request),
    ]);

    const user = JSON.parse(userSession || "{}");
    const cart = JSON.parse(cartSession || "{}");
    const uuid = cart?.uuid;

    if (!uuid) {
      return redirect(
        createPath({
          route: ERoutes.Cart,
        }),
      );
    }

    const recipientResponse = await getRecipient(request, {uuid});

    const cookieData = session.get("FamilyMart_Recipient") || {
      success: true,
    };

    if (recipientResponse.success) {
      return json(
        {
          recipient: recipientResponse.data,
          ...cookieData,
          title: t("routes.titles.recipient"),
          user,
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

    return badRequest({fieldErrors, success: false});
  } catch (error) {
    const errorResponse = error as Response;
    const {message: formError, fieldErrors} = (await getResponseError(errorResponse)) ?? {};

    return badRequest({success: false, formError, fieldErrors});
  }
};

export const meta: MetaFunction = ({data}) => {
  if (typeof window !== "undefined") {
    return {title: i18next.t("routes.titles.recipient") || "Recipient"};
  }
  return {title: data?.title || "Recipient"};
};

export default function RecipientRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <Recipient
      fieldErrors={data.fieldErrors}
      formError={data.formError}
      recipient={data.recipient}
      success={data.success}
      uuid={data.uuid}
    />
  );
}

export function links() {
  return [...recipientLinks()];
}
