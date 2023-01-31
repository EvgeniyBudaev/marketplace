import type { Result, SchemaError } from "remix-domains";
import { errorMessagesFor } from "remix-domains";
import { INPUT_ERROR_PATH } from "../constants";
import { domainErrorsSchema } from "../schemas";

export const parseInputErrors = (result: Result<any>): SchemaError[] => {
  if (result.success) {
    return [];
  }

  const [inputErrors] = errorMessagesFor(result.inputErrors, INPUT_ERROR_PATH);

  if (!inputErrors) {
    return [];
  }

  try {
    const inputErrorsJson = JSON.parse(inputErrors);
    return domainErrorsSchema.parse(inputErrorsJson);
  } catch (error) {
    return [];
  }
};
