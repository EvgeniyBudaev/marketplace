import type { Result } from "remix-domains";
import type { TDomainErrors } from "../types";
import { getInputErrorFieldMessages } from "#app/shared/domain";
import { parseInputErrors } from "./parseInputErrors.server";

export function getInputErrors<TNames extends string = string>(
  result: Result<any>,
  names: TNames[]
): TDomainErrors<TNames> {
  const inputErrors = parseInputErrors(result);
  return names.reduce((acc, name) => {
    const messages = getInputErrorFieldMessages(inputErrors, name);

    if (!messages) {
      return acc;
    }

    return {
      ...acc,
      [name]: messages,
    };
  }, {} as TDomainErrors<TNames>);
}
