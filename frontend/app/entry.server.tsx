import { PassThrough } from "stream";
import {
  createReadableStreamFromReadable,
  type EntryContext,
} from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";
import { I18nextProvider } from "react-i18next";
import { initServerI18Instance, remixI18next } from "#app/services";
import { getContentSecurityPolicy } from "#app/utils";

const ABORT_DELAY = 5000;
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const nonce: string | undefined =
    remixContext.staticHandlerContext.loaderData["root"]?.cspScriptNonce;

  const lng = "ru";
  const ns = remixI18next.getRouteNamespaces(remixContext);
  const instance = await initServerI18Instance(lng, ns);

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </I18nextProvider>,
      {
        onShellReady() {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set(
            "Content-Security-Policy",
            getContentSecurityPolicy(nonce)
          );

          resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: didError
                ? INTERNAL_SERVER_ERROR_STATUS_CODE
                : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
