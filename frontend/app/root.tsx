import { useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { AuthenticityTokenProvider, createAuthenticityToken } from "remix-utils";
import { cryptoRandomStringAsync } from "crypto-random-string";

import { Layout, links as componentsLinks } from "~/components";
import { Environment, EnvironmentType } from "~/environment.server";
import { commitCsrfSession, getCsrfSession } from "~/shared/api/auth";
import { links as uikitLinks } from "~/uikit";
import { createBoundaries } from "~/utils";

import styles from "../styles/app.css";

interface RootLoaderData {
  csrfToken: string;
  cspScriptNonce: string;
  title: string;
  ENV: Pick<EnvironmentType, "IS_PRODUCTION">;
}

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const csrfSession = await getCsrfSession(request);
  const csrfToken = createAuthenticityToken(csrfSession);
  const cspScriptNonce = await cryptoRandomStringAsync({ length: 41 });

  const data: RootLoaderData = {
    csrfToken,
    cspScriptNonce,
    title: "root.title",
    ENV: {
      IS_PRODUCTION: Environment.IS_PRODUCTION,
    },
  };

  return json(data, { headers: { "Set-Cookie": await commitCsrfSession(csrfSession) } });
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }, ...uikitLinks(), ...componentsLinks()];
};

type TDocumentProps = {
  children?: ReactNode;
  cspScriptNonce?: string;
  env?: RootLoaderData["ENV"];
};

const Document: FC<TDocumentProps> = ({ children, cspScriptNonce, env }) => {
  return (
    <html lang={"en"}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=yes"
        ></meta>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>{children}</Layout>
        <ScrollRestoration nonce={cspScriptNonce} />
        <Scripts nonce={cspScriptNonce} />
        {env?.IS_PRODUCTION === false && <LiveReload nonce={cspScriptNonce} />}
      </body>
    </html>
  );
};

export default function App() {
  const { csrfToken, cspScriptNonce, ENV } = useLoaderData<typeof loader>();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <AuthenticityTokenProvider token={csrfToken}>
      <Document cspScriptNonce={cspScriptNonce} env={ENV}>
        <Outlet />
        <script
          nonce={cspScriptNonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.ENV=${JSON.stringify(ENV)}`,
          }}
        />
      </Document>
    </AuthenticityTokenProvider>
  );
}

export const { ErrorBoundary, CatchBoundary } = createBoundaries({
  Layout: Document,
});
