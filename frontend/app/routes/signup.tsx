import { inputFromForm } from "remix-domains";
import { badRequest } from "remix-utils";
import { json } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { Signup, signupLinks } from "~/pages/Auth/Signup";
import { SIGNUP_FORM_KEYS } from "~/pages/Auth/Signup/constants";
import { createUserSession, signup } from "~/shared/api/auth";
import { mapSignupToDto } from "~/shared/api/auth/utils";
import { getInputErrors } from "~/shared/domain";
import { getCsrfSession } from "~/shared/session";
import { getStoreFixedT } from "~/shared/store";
import { checkCSRFToken, getResponseError } from "~/utils";
import { TBaseRouteHandle } from "~/types";

export const action = async (args: ActionArgs) => {
  const { request } = args;

  const [csrfSession, formValues, t] = await Promise.all([
    getCsrfSession(request),
    inputFromForm(request),
    getStoreFixedT({ request }),
  ]);

  const formattedParams = mapSignupToDto(formValues);

  const csrfToken = formValues.csrf;
  const checkCsrf = checkCSRFToken({ csrfToken, session: csrfSession, t });
  if (checkCsrf?.error) return checkCsrf.error;

  try {
    const userResponse = await signup(request, formattedParams);

    if (!userResponse.success) {
      const fieldErrors = getInputErrors(userResponse, Object.values(SIGNUP_FORM_KEYS));
      return badRequest({ success: false, fieldErrors });
    }

    return createUserSession(userResponse.data, "/");
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);

  return json({
    title: t("routes.titles.signup"),
  });
};

export const meta: V2_MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.signup") || "Signup" }];
  }
  return [{ title: data?.title || "Signup" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.signup"),
  },
};

export default function SignupRoute() {
  return <Signup />;
}

export function links() {
  return [...signupLinks()];
}
