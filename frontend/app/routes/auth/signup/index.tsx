import { inputFromForm } from "remix-domains";
import { badRequest } from "remix-utils";
import { json } from "@remix-run/node";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { Signup, signupLinks } from "~/pages/Auth/Signup";
import { SIGNUP_FORM_KEYS } from "~/pages/Auth/Signup/constants";
import { createUserSession, signup } from "~/shared/api/auth";
import { mapSignupToDto } from "~/shared/api/auth/utils";
import { getInputErrors } from "~/shared/domain";
import { getStoreFixedT } from "~/shared/store";
import { getResponseError } from "~/utils";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  const formattedParams = mapSignupToDto(formValues);

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

let hydration = 0;
export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined" && hydration) {
    return { title: i18next.t("routes.titles.signup") || "Signup" };
  }
  hydration++;
  return { title: data?.title || "Signup" };
};

export default function SignupRoute() {
  return <Signup />;
}

export function links() {
  return [...signupLinks()];
}
