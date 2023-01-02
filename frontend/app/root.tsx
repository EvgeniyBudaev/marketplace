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
import { Environment } from "~/environment.server";
import type { EnvironmentType } from "~/environment.server";
import { getUserSession } from "~/shared/api/auth";
import type { TUser } from "~/shared/api/users/types";
import {commitCartSession, getCartSession} from "~/shared/api/cart";
import type {TCart} from "~/shared/api/cart";
import {commitCsrfSession, commitSession, getCsrfSession, getSession} from "~/shared/session";
import { StoreContextProvider, useStore } from "~/shared/store";
import { links as uikitLinks } from "~/uikit";
import { createBoundaries } from "~/utils";
import styles from "../styles/app.css";

interface RootLoaderData {
  cart: TCart | {};
  csrfToken: string;
  cspScriptNonce: string;
  title: string;
  ENV: Pick<EnvironmentType, "IS_PRODUCTION">;
  user: TUser | {};
}

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const csrfSession = await getCsrfSession(request);
  const csrfToken = createAuthenticityToken(csrfSession);
  const cspScriptNonce = await cryptoRandomStringAsync({ length: 41 });
  const session = await getSession(request.headers.get("Cookie"));
  const userSession = await getUserSession(request); //Ryan Florence
  const user = JSON.parse(userSession || "{}");
  const cartSession = await getCartSession(request);
  const cartBefore = cartSession.get("__cart");
  const cart2 = JSON.parse(cartBefore || "{}");
  console.log("[cart2] ", cart2);
  const cart = {};

  const data: RootLoaderData = {
    cart,
    csrfToken,
    cspScriptNonce,
    title: "root.title",
    ENV: {
      IS_PRODUCTION: Environment.IS_PRODUCTION,
    },
    user,
  };

  return json(data, { headers: {
    // "Set-Cookie": await commitCsrfSession(csrfSession)
      "Set-Cookie": await commitCartSession(cartSession),
      //"Set-Cookie": await commitSession(cartSession),
  } });
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
  const { cart, csrfToken, cspScriptNonce, ENV, user } = useLoaderData<typeof loader>();
  const isMounted = useRef<boolean>(false);
  //console.log("Root user: ", user);
  console.log("Root cart: ", cart);

  const store = useStore();
  const setUser = store.setUser;
  const setCart = store.setCart;

  useEffect(() => {
    setUser(user);
    setCart(cart);
  }, [setCart, setUser, cart, user]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <StoreContextProvider store={store}>
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
    </StoreContextProvider>
  );
}

export const { ErrorBoundary, CatchBoundary } = createBoundaries({
  Layout: Document,
});
