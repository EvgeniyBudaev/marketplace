import { isResponse } from "@remix-run/server-runtime/dist/responses";
import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction, DataFunctionArgs } from "@remix-run/server-runtime";
import { composeResponse } from "./composeResponse";
import { JWTService } from "./JWTService";
import { THeaders } from "./types";

export const wrapDataFunction =
  (dataFunction: ActionFunction | LoaderFunction, jwtService: JWTService) =>
  async (args: DataFunctionArgs) => {
    const { request } = args;
    const shouldRefresh = await jwtService.checkIfNeedToRefreshToken(request);
    let responseHeaders: THeaders | undefined;

    if (shouldRefresh) {
      const refreshTokenResponse = await jwtService.refreshAccessToken(request);
      console.log("[refreshTokenResponse] ", refreshTokenResponse);
      // const { accessToken, headers } = await jwtService.refreshAccessToken(request);

      jwtService.setAccessToken(request, refreshTokenResponse.accessToken);
      // responseHeaders = headers;
    }

    try {
      const response = await dataFunction(args);

      if (isResponse(response)) {
        return composeResponse(response, responseHeaders);
      }

      if (response === undefined) {
        return response;
      }

      return json(response, { headers: responseHeaders });
    } catch (error) {
      if (isResponse(error)) {
        throw composeResponse(error, responseHeaders);
      }

      throw error;
    }
  };
