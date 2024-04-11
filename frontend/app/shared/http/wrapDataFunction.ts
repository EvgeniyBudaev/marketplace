import { isResponse } from "@remix-run/server-runtime/dist/responses.js";
import { json } from "@remix-run/node";
import type {
  ActionFunction,
  LoaderFunction,
  DataFunctionArgs,
} from "@remix-run/server-runtime";
import { composeResponse } from "./composeResponse.ts";
import { JWTService } from "./JWTService.ts";

export const wrapDataFunction =
  (dataFunction: ActionFunction | LoaderFunction, jwtService: JWTService) =>
  async (args: DataFunctionArgs) => {
    const { request } = args;
    const shouldRefresh = await jwtService.checkIfNeedToRefreshToken(request);

    if (shouldRefresh) {
      await jwtService.refreshAccessToken(request);
    }

    try {
      const response = await dataFunction(args);

      if (isResponse(response)) {
        return composeResponse(response);
      }

      if (response === undefined) {
        return response;
      }

      return json(response);
    } catch (error) {
      if (isResponse(error)) {
        throw composeResponse(error);
      }

      throw error;
    }
  };
