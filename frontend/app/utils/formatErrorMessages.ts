export const DEFAULT_ERRORS_DELIMITER = "\n";

export function formatErrorMessages(
  messages: string | string[],
  delimiter: string = DEFAULT_ERRORS_DELIMITER,
): string | null {
  if (!messages.length) {
    return null;
  }

  if (Array.isArray(messages)) {
    return messages.join(delimiter);
  }

  return messages;
}
