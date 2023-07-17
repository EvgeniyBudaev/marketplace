import {inputFromForm} from "remix-domains";
import {json} from "@remix-run/node";
import type {ActionArgs} from "@remix-run/node";
import {badRequest} from "remix-utils";
import {getResponseError} from "~/shared/domain";
import {updateLanguage} from "~/shared/api/settings";

export const action = async (args: ActionArgs) => {
  const {request} = args;
  const formValues = await inputFromForm(request);

  try {
    const response = await updateLanguage(request, formValues);
    if (response.success) {
      return json({
        theme: response.data,
        success: true,
      });
    }

    return badRequest({success: false});
  } catch (error) {
    const errorResponse = error as Response;
    const {message: formError, fieldErrors} = (await getResponseError(errorResponse)) ?? {};
    return badRequest({success: false, formError, fieldErrors});
  }
};
