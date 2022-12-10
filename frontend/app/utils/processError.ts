import type { TErrorResponse } from "~/types";
import { EErrorTypes } from "~/enums";

/**
 * Обрабатывает ошибочный запрос
 *
 * @param e
 */
export const processError = (e: Error | Response): TErrorResponse => {
  if (e instanceof Response) {
    throw e;
  }
  if (e.name === "AbortError") {
    return { type: EErrorTypes.Abort };
  }
  return { type: EErrorTypes.Server };
};
