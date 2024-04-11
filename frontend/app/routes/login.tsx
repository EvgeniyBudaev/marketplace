import { inputFromForm } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import i18next from "i18next";

import { Login, loginLinks } from "#app/pages/Auth/Login";
import { LOGIN_FORM_KEYS } from "#app/pages/Auth/Login/constants";
import { createUserSession, login } from "#app/shared/api/auth";
import { getUser } from "#app/shared/api/users/domain.server";
import { getInputErrors } from "#app/shared/domain";
import { commitSession, getCsrfSession, getSession } from "#app/shared/session";
import { getStoreFixedT } from "#app/shared/store";
import { checkCSRFToken, createBoundaries, getResponseError } from "#app/utils";
import { TBaseRouteHandle } from "#app/types";

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const [csrfSession, formValues, t] = await Promise.all([
    getCsrfSession(request),
    inputFromForm(request),
    getStoreFixedT({ request }),
  ]);

  const csrfToken = formValues.csrf;
  const checkCsrf = checkCSRFToken({ csrfToken, session: csrfSession, t });
  if (checkCsrf?.error) return checkCsrf.error;

  let errored = false;
  const session = await getSession(request.headers.get("Cookie"));

  if (!formValues.email) {
    errored = true;
    session.flash("emailError", "email is required");
  }
  if (!formValues.password) {
    errored = true;
    session.flash("passwordError", "password is required");
  }

  if (errored) {
    session.flash("email", formValues.email);
    session.flash("password", formValues.password);
    return redirect("/auth/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  try {
    const formattedData = {
      email: formValues.email,
      password: formValues.password,
    };

    const loginResponse = await login(request, formattedData);

    if (!loginResponse.success) {
      const fieldErrors = getInputErrors(
        loginResponse,
        Object.values(LOGIN_FORM_KEYS)
      );
      return json({ success: false, fieldErrors }, { status: 400 });
    }

    const userResponse = await getUser(request, {
      access_token: loginResponse.data.access_token,
    });

    if (!userResponse.success) {
      const fieldErrors = getInputErrors(
        loginResponse,
        Object.values(LOGIN_FORM_KEYS)
      );
      return json({ success: false, fieldErrors }, { status: 400 });
    }

    return createUserSession(userResponse.data, loginResponse.data, "/");
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } =
      (await getResponseError(errorResponse)) ?? {};
    return json({ success: false, formError, fieldErrors }, { status: 400 });
  }
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({ request })]);
  const session = await getSession(request.headers.get("Cookie"));
  return json(
    {
      email: session.get("email"),
      password: session.get("password"),
      emailError: session.get("emailError"),
      passwordError: session.get("passwordError"),
      title: t("routes.titles.login"),
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.login") || "Login" }];
  }
  return [{ title: data?.title || "Login" }];
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.login"),
  },
};

export default function LoginRoute() {
  return <Login />;
}

export function links() {
  return [...loginLinks()];
}

export const { ErrorBoundary, CatchBoundary } = createBoundaries({
  statusMap: new Map([[404, () => "errorBoundary.user.notFound"]]),
});
