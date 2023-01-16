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
import isEmpty from "lodash/isEmpty";

import { Layout, links as componentsLinks } from "~/components";
import { Environment } from "~/environment.server";
import type { EnvironmentType } from "~/environment.server";
import { getUserSession } from "~/shared/api/auth";
import type { TUser } from "~/shared/api/users/types";
import { createCartSession, getCart, getCartSession, TCart } from "~/shared/api/cart";
import { commitCsrfSession, getCsrfSession } from "~/shared/session";
import { StoreContextProvider, useStore } from "~/shared/store";
import { links as uikitLinks } from "~/uikit";
import { createBoundaries, internalError } from "~/utils";
import styles from "../styles/app.css";

interface RootLoaderData {
  cart: TCart;
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

  const userSession = await getUserSession(request); //Ryan Florence
  const user = JSON.parse(userSession || "{}");

  const cartSession = await getCartSession(request);
  const cart = JSON.parse(cartSession || "{}");
  let cartResponse;

  if (isEmpty(cart)) {
    cartResponse = await getCart(request, { uuid: null });
  } else {
    cartResponse = await getCart(request, { uuid: cart.uuid });
  }

  if (!cartResponse.success) {
    throw internalError();
  }

  const updatedCartSession = await createCartSession(cartResponse.data);

  const data: RootLoaderData = {
    cart: cartResponse.data,
    csrfToken,
    cspScriptNonce,
    title: "root.title",
    ENV: {
      IS_PRODUCTION: Environment.IS_PRODUCTION,
    },
    user,
  };

  const headers = new Headers();
  headers.append("Set-Cookie", await commitCsrfSession(csrfSession));
  Object.entries(updatedCartSession.headers).forEach(([header, value]) => {
    headers.append(header, value);
  });

  return json(data, {
    headers,
  });
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
  cart?: TCart;
  children?: ReactNode;
  cspScriptNonce?: string;
  env?: RootLoaderData["ENV"];
};

const Document: FC<TDocumentProps> = ({ cart, children, cspScriptNonce, env }) => {
  if (typeof window !== "undefined") {
    cspScriptNonce = "";
  }

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
        <Layout cart={cart}>{children}</Layout>
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

  const store = useStore();
  const setUser = store.setUser;

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <StoreContextProvider store={store}>
      <AuthenticityTokenProvider token={csrfToken}>
        <Document cart={cart} cspScriptNonce={cspScriptNonce} env={ENV}>
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
