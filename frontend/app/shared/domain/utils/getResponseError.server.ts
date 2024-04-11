import { formatResponseFieldErrors } from "#app/shared/domain";
import type { ICommonResponseError, TDomainErrors } from "../types";

interface ResponseError {
  message: string;
  fieldErrors?: TDomainErrors;
}

export const DEFAULT_RESPONSE_ERROR_MESSAGE = "Unknown error";

export async function getResponseError(
  response: Response
): Promise<ResponseError | null> {
  if (response.ok) {
    return null;
  }

  const defaultMessage = response.statusText || DEFAULT_RESPONSE_ERROR_MESSAGE;

  try {
    const responseData: ICommonResponseError = await response.json();

    const responseError: ResponseError = {
      message: responseData.message ?? defaultMessage,
    };

    if (responseData.fieldErrors) {
      responseError.fieldErrors = formatResponseFieldErrors(
        responseData.fieldErrors
      );
    }

    return responseError;
  } catch (error) {
    return { message: defaultMessage };
  }
}
