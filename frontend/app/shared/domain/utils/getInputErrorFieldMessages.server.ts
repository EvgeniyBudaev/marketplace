import { errorMessagesFor } from "remix-domains";
import type { SchemaError } from "remix-domains";

export const getInputErrorFieldMessages = (
  inputErrors: SchemaError[],
  name: string
): string[] | null => {
  const messages = errorMessagesFor(inputErrors, name);

  if (!messages.length) {
    return null;
  }

  return messages;
};
