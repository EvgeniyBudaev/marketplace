import { json } from "@remix-run/node";
import { getResponseError } from "#app/shared/domain";
import type { TActionResponseFailure } from "#app/types";

export async function parseResponseError(error: unknown): Promise<Response> {
  if (!(error instanceof Response)) {
    return json<TActionResponseFailure>(
      {
        success: false,
        formError: (error as Error).message,
      },
      { status: 500 }
    );
  }

  const responseError = await getResponseError(error);

  if (!responseError) {
    return json<TActionResponseFailure>({ success: false }, { status: 500 });
  }

  const { message: formError, fieldErrors } = responseError;

  const data: TActionResponseFailure = {
    success: false,
    formError,
    fieldErrors,
  };

  return json(data, { status: error.status });
}
