import { useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import reactToastifyStyles from "react-toastify/dist/ReactToastify.css";
import modalStyles from "react-responsive-modal/styles.css";
import { json } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
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
import { connect } from "socket.io-client";
import type { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import i18next from "i18next";
import slickStyles from "slick-carousel/slick/slick.css";
import slickThemeStyles from "slick-carousel/slick/slick-theme.css";

import { Layout, links as componentsLinks } from "~/components";
import { DEFAULT_LANGUAGE } from "~/constants";
import { Environment } from "~/environment.server";
import type { EnvironmentType } from "~/environment.server";
import { useInitDayjs, useInitLanguage } from "~/hooks";
import { links as sharedLinks } from "~/shared";
import { setApiLanguage } from "~/shared/api";
import { getUserSession } from "~/shared/api/auth";
import type { TUser } from "~/shared/api/users/types";
import type { TCart } from "~/shared/api/cart";
import { createCartSession, getCart, getCartSession } from "~/shared/api/cart";
import type { TSettings } from "~/shared/api/settings";
import { createSettingsSession, getSettings } from "~/shared/api/settings";
import { ChangeLanguageProvider, SocketProvider } from "~/shared/context";
import { commitCsrfSession, getCsrfSession } from "~/shared/session";
import {
  getStoreFixedT,
  parseAcceptLanguage,
  StoreContextProvider,
  useStore,
} from "~/shared/store";
import { ETheme, links as uikitLinks, ToastContainer } from "~/uikit";
import { createBoundaries, internalError } from "~/utils";
import styles from "../styles/app.css";

interface RootLoaderData {
  basename: string | null;
  cart: TCart;
  csrfToken: string;
  cspScriptNonce: string;
  title: string;
  ENV: Pick<EnvironmentType, "IS_PRODUCTION">;
  settings: TSettings;
  user: TUser | {};
}

export const loader = async (args: LoaderArgs) => {
  const { request } = args;

  const [cartSession, csrfSession, userSession] = await Promise.all([
    getCartSession(request),
    getCsrfSession(request),
    getUserSession(request),
  ]);

  let csrfToken: string;
  if (csrfSession.get("csrf")) {
    csrfToken = csrfSession.get("csrf");
  } else {
    csrfToken = createAuthenticityToken(csrfSession);
  }

  const cspScriptNonce = await cryptoRandomStringAsync({ length: 41 });

  // Get user
  const user = JSON.parse(userSession || "{}");

  // Get cart
  const cart = JSON.parse(cartSession || "{}");
  // console.log("[user.uuid] ", user.uuid);
  // console.log("[cart.uuid] ", cart.uuid);
  let cartResponse;
  if (isEmpty(cart)) {
    cartResponse = await getCart(request, { uuid: null });
  } else {
    cartResponse = await getCart(request, { uuid: cart.uuid });
  }
  if (!cartResponse.success) {
    throw internalError();
  }

  const [settingsResponse, updatedCartSession] = await Promise.all([
    getSettings(request, { uuid: cartResponse.data.uuid }),
    createCartSession(cartResponse.data),
  ]);

  // Get settings
  if (!settingsResponse.success) {
    throw internalError();
  }
  setApiLanguage(settingsResponse.data.language ?? parseAcceptLanguage(request));
  const [t, updatedSettingsSession] = await Promise.all([
    getStoreFixedT({ request, uuid: cartResponse.data.uuid }),
    createSettingsSession(settingsResponse.data),
  ]);

  const basename = request.headers.get('x-remix-basename');

  const data: RootLoaderData = {
    basename,
    cart: cartResponse.data,
    csrfToken,
    cspScriptNonce,
    title: t("routes.titles.root"),
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

// export const meta: MetaFunction = () => ({
//   charset: "utf-8",
//   title: i18next.t("routes.titles.root") || "FamilyMart",
//   viewport: "width=device-width,initial-scale=1",
// });

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: reactToastifyStyles },
    { rel: "stylesheet", href: modalStyles },
    { rel: "stylesheet", href: slickStyles },
    { rel: "stylesheet", href: slickThemeStyles },
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
  const { i18n } = useTranslation();
  // const { storageLanguage, setStorageLanguage } = useLanguageStore();
  const language = !isNil(settings) ? settings?.language?.toLowerCase() : DEFAULT_LANGUAGE;
  useInitLanguage(language);
  useInitDayjs();
  const theme = !isNil(settings) ? (settings.theme as ETheme) : ETheme.Light;

  const lastLanguage = useRef<string | null>(null);

  useEffect(() => {
    const languageSwitchChannel = new BroadcastChannel("language");
    languageSwitchChannel.addEventListener("message", (event) => {
      if (lastLanguage.current !== event.data) {
        lastLanguage.current = event.data;
        i18n.changeLanguage(event.data);
      }
    });
    i18n.on("languageChanged", (language) => {
      if (language !== lastLanguage.current) {
        lastLanguage.current = language;
        languageSwitchChannel.postMessage(language);
      }
    });
  }, [i18n]);

  if (typeof window !== "undefined") {
    cspScriptNonce = "";
    // if (!storageLanguage) {
    //   setStorageLanguage(i18n.language as ELanguages);
    // }
  }

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
  const changeLanguageState = useState(false);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  console.log("[root cart uuid] ", cart.uuid);
  const store = useStore();
  const setUser = store.setUser;
  const setCart = store.setCart;
  const setSettings = store.setSettings;

  useEffect(() => {
    let connection = connect();
    setSocket(connection);
    return () => {
      connection.close();
    };
  }, []);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  useEffect(() => {
    setCart(cart);
  }, [setCart, cart]);

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
    <SocketProvider value={socket}>
      <StoreContextProvider store={store}>
        <AuthenticityTokenProvider token={csrfToken}>
          <ChangeLanguageProvider value={changeLanguageState}>
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
          </ChangeLanguageProvider>
        </AuthenticityTokenProvider>
      </StoreContextProvider>
    </SocketProvider>
  );
}

export const { ErrorBoundary, CatchBoundary } = createBoundaries({
  Layout: Document,
});
