import { inputFromForm } from "remix-domains";
import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { Login, loginLinks } from "~/pages/Auth/Login";
import { login } from "~/shared/api/auth";
import { createBoundaries, internalError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);

  const loginResponse = await login(request, formValues);

  if (!loginResponse.success) {
    throw internalError();
  }

  return json({
    login: loginResponse.data,
  });
};

export default function LoginPage() {
  return <Login />;
}

export function links() {
  return [...loginLinks()];
}

export const { ErrorBoundary, CatchBoundary } = createBoundaries({
  statusMap: new Map([[404, () => "errorBoundary.user.notFound"]]),
});
