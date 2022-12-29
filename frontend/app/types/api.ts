import type { EErrorTypes } from "~/enums";

export type TApiConfig = {
  basePath: string;
  timeout: number;
  retry: number;
};

export type TApiOptions = Omit<RequestInit, "body"> & { body?: any; retry?: number };

export type TApiFunction = <T extends unknown>(
  request: Request,
  path: string,
  options?: TApiOptions,
) => Promise<T>;

/**
 * Запрос с ошибкой
 */
export type TErrorResponse = {
  type: EErrorTypes;
  response?: Response;
};
