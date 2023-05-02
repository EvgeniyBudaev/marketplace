import { inputFromForm } from "remix-domains";
import {json, redirect} from "@remix-run/node";
import type { ActionArgs, LoaderArgs , MetaFunction} from "@remix-run/node";
import { badRequest } from "remix-utils";

import { Login, loginLinks } from "~/pages/Auth/Login";
import { LOGIN_FORM_KEYS } from "~/pages/Auth/Login/constants";
import { createUserSession, login } from "~/shared/api/auth";
import { getUser } from "~/shared/api/users/domain.server";
import { getInputErrors } from "~/shared/domain";
import { commitSession, getSession } from "~/shared/session";
import {getStoreFixedT} from "~/shared/store";
import { createBoundaries, getResponseError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);

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
    const loginResponse = await login(request, formValues);

    if (!loginResponse.success) {
      const fieldErrors = getInputErrors(loginResponse, Object.values(LOGIN_FORM_KEYS));
      return badRequest({ success: false, fieldErrors });
    }

    const userResponse = await getUser(request, {
      access_token: loginResponse.data.access_token,
    });

    if (!userResponse.success) {
      const fieldErrors = getInputErrors(loginResponse, Object.values(LOGIN_FORM_KEYS));
      return badRequest({ success: false, fieldErrors });
    }

    return createUserSession(userResponse.data, loginResponse.data, "/");
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    return badRequest({ success: false, formError, fieldErrors });
  }
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t] = await Promise.all([getStoreFixedT({request})]);
  const session = await getSession(request.headers.get("Cookie"));
  return json(
    {
      email: session.get("email"),
      password: session.get("password"),
      emailError: session.get("emailError"),
      passwordError: session.get("passwordError"),
      title: t("pages.login.meta.title"),
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
};

export const meta: MetaFunction = ({ data }) => {
  return { title: data?.title || "Login" };
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
