import { serverError } from "remix-utils";
import { json } from "@remix-run/node";
import { getResponseError } from "~/shared/domain";
import type { TActionResponseFailure } from "~/types";

export async function parseResponseError(error: unknown): Promise<Response> {
  if (!(error instanceof Response)) {
    return serverError<TActionResponseFailure>({
      success: false,
      formError: (error as Error).message,
    });
  }

  const responseError = await getResponseError(error);

  if (!responseError) {
    return serverError<TActionResponseFailure>({ success: false });
  }

  const { message: formError, fieldErrors } = responseError;

  const data: TActionResponseFailure = { success: false, formError, fieldErrors };

  return json(data, { status: error.status });
}
