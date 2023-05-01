import { useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import reactToastifyStyles from "react-toastify/dist/ReactToastify.css";
import modalStyles from "react-responsive-modal/styles.css";
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
import clsx from "clsx";
import { cryptoRandomStringAsync } from "crypto-random-string";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

import { Layout, links as componentsLinks } from "~/components";
import { Environment } from "~/environment.server";
import type { EnvironmentType } from "~/environment.server";
import { useInitDayjs, useInitLanguage } from "~/hooks";
import { links as sharedLinks } from "~/shared";
import {setApiLanguage} from "~/shared/api";
import { getUserSession } from "~/shared/api/auth";
import type { TUser } from "~/shared/api/users/types";
import type { TCart } from "~/shared/api/cart";
import { createCartSession, getCart, getCartSession } from "~/shared/api/cart";
import type { TSettings } from "~/shared/api/settings";
import {createSettingsSession, getSettings} from "~/shared/api/settings";
import { commitCsrfSession, getCsrfSession } from "~/shared/session";
import {parseAcceptLanguage, StoreContextProvider, useStore} from "~/shared/store";
import { ETheme, links as uikitLinks, ToastContainer } from "~/uikit";
import { createBoundaries, internalError } from "~/utils";
import styles from "../styles/app.css";

interface RootLoaderData {
  cart: TCart;
  csrfToken: string;
  cspScriptNonce: string;
  // title: string;
  ENV: Pick<EnvironmentType, "IS_PRODUCTION">;
  settings: TSettings;
  user: TUser | {};
}

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const csrfSession = await getCsrfSession(request);
  const csrfToken = createAuthenticityToken(csrfSession);
  const cspScriptNonce = await cryptoRandomStringAsync({ length: 41 });

  // Get user
  const userSession = await getUserSession(request); //Ryan Florence
  const user = JSON.parse(userSession || "{}");

  // Get cart
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

  // Get settings
  const settingsResponse = await getSettings(request, { uuid: cartResponse.data.uuid });
  if (!settingsResponse.success) {
    throw internalError();
  }
  console.log("root settingsResponse.data", settingsResponse.data);
  setApiLanguage(settingsResponse.data.language ?? parseAcceptLanguage(request));
  const updatedSettingsSession = await createSettingsSession(settingsResponse.data);
  console.log("updatedSettingsSession: ", updatedSettingsSession);
  // const t = await getStoreFixedT(request);

  const data: RootLoaderData = {
    cart: cartResponse.data,
    csrfToken,
    cspScriptNonce,
    // title: t("root.title"),
    ENV: {
      IS_PRODUCTION: Environment.IS_PRODUCTION,
    },
    settings: settingsResponse.data,
    user,
  };

  const headers = new Headers();
  headers.append("Set-Cookie", await commitCsrfSession(csrfSession));

  [updatedCartSession.headers, updatedSettingsSession.headers]
    .flatMap((headers) => Object.entries(headers))
    .forEach(([header, value]) => {
      headers.append(header, value);
    });

  return json(data, {
    headers,
  });
};

export const meta: MetaFunction = ({ data = {} }) => ({
  charset: "utf-8",
  title: data.title || "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: reactToastifyStyles },
    { rel: "stylesheet", href: modalStyles },
    ...uikitLinks(),
    ...componentsLinks(),
    ...sharedLinks(),
  ];
};

export let handle = {
  i18n: "index",
};

type TDocumentProps = {
  cart?: TCart;
  children?: ReactNode;
  cspScriptNonce?: string;
  env?: RootLoaderData["ENV"];
  settings?: TSettings;
};

const Document: FC<TDocumentProps> = ({ cart, children, cspScriptNonce, env, settings }) => {
  if (typeof window !== "undefined") {
    cspScriptNonce = "";
  }
  const { i18n } = useTranslation();
  const language = !isNil(settings) ? settings?.language.toLowerCase() : "ru";
  useInitLanguage(language);
  useInitDayjs();
  const theme = !isNil(settings) ? (settings.theme as ETheme) : ETheme.Light;

  return (
    <html lang={i18n.language} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=yes"
        ></meta>
        <Meta />
        <Links />
      </head>
      <body className={clsx({ "theme-dark": theme === ETheme.Dark })}>
        <Layout cart={cart} theme={theme}>
          {children}
        </Layout>
        <ToastContainer />
        <ScrollRestoration nonce={cspScriptNonce} />
        <Scripts nonce={cspScriptNonce} />
        {env?.IS_PRODUCTION === false && <LiveReload nonce={cspScriptNonce} />}
      </body>
    </html>
  );
};

export default function App() {
  const { cart, csrfToken, cspScriptNonce, ENV, settings, user } = useLoaderData<typeof loader>();
  const isMounted = useRef<boolean>(false);

  const store = useStore();
  const setUser = store.setUser;
  const setSettings = store.setSettings;

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    setSettings(settings);
  }, [setSettings, settings]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <StoreContextProvider store={store}>
      <AuthenticityTokenProvider token={csrfToken}>
        <Document cart={cart} cspScriptNonce={cspScriptNonce} env={ENV} settings={settings}>
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
