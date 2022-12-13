import {inputFromForm} from 'remix-domains';
import type { ActionArgs } from '@remix-run/node';
import { Login, loginLinks } from "~/pages/Auth/Login";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[formValues] ", formValues);

  return null;
}

export default function LoginPage() {
  return <Login />;
}

export function links() {
  return [...loginLinks()];
}
