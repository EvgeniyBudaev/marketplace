import { inputFromForm } from "remix-domains";
import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { Signup, signupLinks } from "~/pages/Auth/Signup";
import { createUserSession, signup } from "~/shared/api/auth";
import { mapSignupToDto } from "~/shared/api/auth/utils";
import { parseResponseError } from "~/utils";
import ShippingRoute from "~/routes/shipping";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  const formattedParams = mapSignupToDto(formValues);

  try {
    const userResponse = await signup(request, formattedParams);

    if (userResponse.success) {
      return createUserSession(userResponse.data, "/");
    }

    return json(userResponse);
  } catch (error) {
    return parseResponseError(error);
  }
};

export default function SignupRoute() {
  return <Signup />;
}

export function links() {
  return [...signupLinks()];
}
