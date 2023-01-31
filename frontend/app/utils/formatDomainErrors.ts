import { formatErrorMessages } from "./formatErrorMessages";
import { TDomainErrors } from "~/shared/domain";
import { TFormattedDomainErrors } from "~/types";

export function formatDomainErrors(
  domainErrors?: TDomainErrors,
  delimiter?: string,
): TFormattedDomainErrors {
  if (!domainErrors) {
    return null;
  }

  return Object.entries(domainErrors).reduce((acc, [key, messages]) => {
    if (!messages) {
      return acc;
    }

    return {
      ...acc,
      [key]: formatErrorMessages(messages, delimiter) ?? undefined,
    };
  }, {} as TFormattedDomainErrors);
}
