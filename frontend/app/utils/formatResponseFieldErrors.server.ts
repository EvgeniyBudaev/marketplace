import type { IResponseFieldErrors, TDomainErrors } from "#app/types";

export function formatResponseFieldErrors(
  fieldErrors: IResponseFieldErrors
): TDomainErrors {
  return Object.entries(fieldErrors).reduce((acc, [key, fieldErrorList]) => {
    const messages = fieldErrorList.map((item) => item.message);

    if (!messages.length) {
      return acc;
    }

    return {
      ...acc,
      [key]: messages,
    };
  }, {} as TDomainErrors);
}
