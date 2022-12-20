import { inputFromForm } from "remix-domains";
import type { ActionArgs } from "@remix-run/node";
import { Login, loginLinks } from "~/pages/Auth/Login";
import {login} from "~/shared/api/auth";
import {createBoundaries, internalError} from "~/utils";
import {json} from "@remix-run/node";
import {useActionData} from "@remix-run/react";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[formValues] ", formValues);

 const loginResponse = await login(request, formValues);
  console.log("[loginResponse] ", loginResponse);

  if (!loginResponse.success) {
    throw internalError();
  }
  console.log("[loginResponse.data] ", loginResponse.data);

  return json({
    login: loginResponse.data,
  });

};

export default function LoginPage() {
  const dataAction = useActionData<typeof action>();
  console.log("dataAction: ", dataAction);

  return <Login />;
}

export function links() {
  return [...loginLinks()];
}

export const { ErrorBoundary, CatchBoundary } = createBoundaries({
  statusMap: new Map([[404, () => "errorBoundary.user.notFound"]]),
});
