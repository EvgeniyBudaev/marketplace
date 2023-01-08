import { inputFromForm } from "remix-domains";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Login, loginLinks } from "~/pages/Auth/Login";
import { createUserSession, login } from "~/shared/api/auth";
import { getUser } from "~/shared/api/users/domain.server";
import { commitSession, getSession } from "~/shared/session";
import { createBoundaries, parseResponseError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);

  //Ryan Florence
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
      return json(loginResponse);
    }

    const userResponse = await getUser(request, {
      access_token: loginResponse.data.access_token,
    });

    if (userResponse.success) {
      return createUserSession(userResponse.data, loginResponse.data, "/");
    }

    return json(userResponse);
  } catch (error) {
    return parseResponseError(error);
  }
};

//Ryan Florence
export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const session = await getSession(request.headers.get("Cookie"));
  return json(
    {
      email: session.get("email"),
      password: session.get("password"),
      emailError: session.get("emailError"),
      passwordError: session.get("passwordError"),
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
};

export default function LoginRoute() {
  const errors = useLoaderData<typeof loader>(); // { session.emailError && <span>{session.emailError}</span>}
  //console.log("Login errors: ", errors);
  return <Login />;
}

export function links() {
  return [...loginLinks()];
}

export const { ErrorBoundary, CatchBoundary } = createBoundaries({
  statusMap: new Map([[404, () => "errorBoundary.user.notFound"]]),
});
