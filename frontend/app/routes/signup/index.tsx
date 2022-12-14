import { inputFromForm } from "remix-domains";
import type { ActionArgs } from "@remix-run/node";
import { Signup, signupLinks } from "~/pages/Auth/Signup";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[formValues] ", formValues);

  return null;
};

export default function SignupPage() {
  return <Signup />;
}

export function links() {
  return [...signupLinks()];
}
