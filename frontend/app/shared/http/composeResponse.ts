import { THeaders } from "./types";

export function composeResponse(
  response: Response,
  headers?: THeaders
): Response {
  if (!headers) {
    return response;
  }

  return Object.entries(headers).reduce((acc, [key, value]) => {
    acc.headers.append(key, value);

    return acc;
  }, response);
}
