import { inputFromForm } from "remix-domains";
import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { badRequest } from "remix-utils";
import { getResponseError } from "~/shared/domain";
import { updateTheme } from "~/shared/api/settings";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  const formValues = await inputFromForm(request);
  console.log("[formValues] ", formValues);

  try {
    const response = await updateTheme(request, formValues);
    console.log("[response.success] ", response.success);
    if (response.success) {
      console.log("[response.data] ", response.data);
      return json({
        theme: response.data,
        success: true,
      });
    }

    return badRequest({ success: false });
  } catch (error) {
    const errorResponse = error as Response;
    const { message: formError, fieldErrors } = (await getResponseError(errorResponse)) ?? {};
    console.log("[ERROR] ", error);
    console.log("[fieldErrors] ", fieldErrors);
    console.log("[formError] ", formError);
    return badRequest({ success: false, formError, fieldErrors });
  }
};
