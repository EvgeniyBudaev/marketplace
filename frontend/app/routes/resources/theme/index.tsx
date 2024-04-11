import { inputFromForm } from "remix-domains";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { getResponseError } from "#app/shared/domain";
import { updateTheme } from "#app/shared/api/settings";

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);

  try {
    const response = await updateTheme(request, formValues);
    if (response.success) {
      return json({
        theme: response.data,
        success: true,
      });
    }

    return json({ success: false }, { status: 400 });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } =
      (await getResponseError(errorResponse)) ?? {};
    return json({ success: false, formError, fieldErrors }, { status: 400 });
  }
};
