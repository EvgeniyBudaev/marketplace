import type { ICommonResponseError, TDomainErrors } from "#app/types";
import { formatResponseFieldErrors } from "./formatResponseFieldErrors.server";

interface ResponseError {
  message: string;
  fieldErrors?: TDomainErrors;
}

export const DEFAULT_RESPONSE_ERROR_MESSAGE = "Произошла неизвестная ошибка";

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
