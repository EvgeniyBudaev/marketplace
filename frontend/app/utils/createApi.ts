import { TApiConfig, TApiFunction, TErrorResponse } from "~/types";
import { setResponseTimeout } from "~/utils/setResponseTimeout";
import { processSuccessResponse } from "~/utils/processSuccessResponse";
import { EErrorTypes } from "~/enums";
import { processError } from "~/utils/processError";
import { gatewayTimeout } from "~/utils/gatewayTimeout";
import { internalError } from "~/utils/internalError";

/**
 *  Функция создания api- клиента
 *
 * @param config конфигурация {@link TApiConfig}
 *
 * Возвращает функцию для осуществления http запросов {@link TApiFunction}
 */
export function createApi(config: TApiConfig): { fetchApi: TApiFunction } {
  const { basePath } = config;

  const fetchApi: TApiFunction = async (request, path, options) => {
    //const accessToken = await jwtService.getAccessToken(request);
    const url = basePath + path;
    let contentType: { "Content-Type"?: string } = { "Content-Type": "application/json" };
    let body;

    if (options?.body) {
      if (options?.body instanceof FormData) {
        contentType = {};
        body = options?.body;
      } else {
        body = JSON.stringify(options.body);
      }
    }

    const requestOptions = {
      ...options,
      headers: {
        ...contentType,
        //Authorization: `Bearer ${accessToken}`,
        //'Accept-Language': language,
        traceparent: request.headers.get("traceparent") ?? "",
        ...options?.headers,
      },
      body,
    };

    let errorResponse: TErrorResponse | null = null;

    for (let i = 0; i < (options?.retry ?? config.retry); i++) {
      const [signal, timeoutId] = setResponseTimeout(config.timeout);
      try {
        const response = await fetch(url, { ...requestOptions, signal });
        clearTimeout(timeoutId);
        if (response.ok) {
          return await processSuccessResponse(response);
        }
        // if (response.status === 401) {
        //     let headers: THeaders | undefined;
        //     try {
        //         const accessTokenData = await jwtService.refreshAccessToken(request);
        //
        //         headers = accessTokenData.headers;
        //     } catch (error) {}
        //
        //     if (headers) {
        //         throw redirect(request.url, {
        //             headers,
        //             status: 307, // Reuse original method and body. Needed for POST requests
        //         });
        //     }
        // }
        errorResponse = { type: EErrorTypes.Server, response: response };
      } catch (e: any) {
        errorResponse = processError(e);
      }
    }
    if (errorResponse) {
      if (errorResponse.type === EErrorTypes.Abort) {
        throw gatewayTimeout();
      }
      if (errorResponse.response) {
        const { response } = errorResponse;
        const errorMsg = await errorResponse.response.text();
        throw new Response(errorMsg, { status: response.status });
      }
      throw internalError("Unexpected error");
    }
    throw internalError("Unexpected error");
  };

  return { fetchApi };
}
