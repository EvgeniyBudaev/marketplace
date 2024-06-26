import { useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import reactToastifyStyles from "react-toastify/dist/ReactToastify.css";
import modalStyles from "react-responsive-modal/styles.css";
import { json } from "@remix-run/node";
// import { cssBundleHref } from "@remix-run/css-bundle";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { csrf } from "#app/utils/csrf.server";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
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
import { Layout, links as componentsLinks } from "#app/components";
import { DEFAULT_LANGUAGE } from "#app/constants";
import { Environment } from "#app/environment.server";
import type { EnvironmentType } from "#app/environment.server";
import { useInitDayjs, useInitLanguage } from "#app/hooks";
import { links as sharedLinks } from "#app/shared";
import { setApiLanguage } from "#app/shared/api";
import { getUserSession } from "#app/shared/api/auth";
import type { TUser } from "#app/shared/api/users/types";
import type { TCart } from "#app/shared/api/cart";
import {
  createCartSession,
  getCart,
  getCartSession,
} from "#app/shared/api/cart";
import type { TSettings } from "#app/shared/api/settings";
import { createSettingsSession, getSettings } from "#app/shared/api/settings";
import { ChangeLanguageProvider, SocketProvider } from "#app/shared/context";
import { commitCsrfSession, getCsrfSession } from "#app/shared/session";
import {
  getStoreFixedT,
  parseAcceptLanguage,
  StoreContextProvider,
  useStore,
} from "#app/shared/store";
import { ETheme, links as uikitLinks, ToastContainer } from "#app/uikit";
import { createBoundaries, internalError } from "#app/utils";
import styles from "../styles/app.css";

interface RootLoaderData {
  basename: string | null;
  cart: TCart | {};
  csrfToken: string;
  cspScriptNonce: string;
  ENV: Pick<EnvironmentType, "IS_PRODUCTION" | "ROUTER_PREFIX">;
  settings: TSettings | {};
  title: string;
  user: TUser | {};
}

export const loader = async (args: LoaderFunctionArgs) => {
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
    // csrfToken = createAuthenticityToken(csrfSession);
    csrfToken = csrf.generate(64);
  }

  const cspScriptNonce = await cryptoRandomStringAsync({ length: 41 });

  // Get user
  const user = JSON.parse(userSession || "{}");

  // Get cart
  const cart = JSON.parse(cartSession || "{}");
  // console.log("[user.uuid] ", user.uuid);
  // console.log("[cart.uuid] ", cart.uuid);
  // let cartResponse;
  // if (isEmpty(cart)) {
  //   cartResponse = await getCart(request, { uuid: null });
  // } else {
  //   cartResponse = await getCart(request, { uuid: cart.uuid });
  // }
  // if (!cartResponse.success) {
  //   throw internalError();
  // }

  // const [settingsResponse, updatedCartSession] = await Promise.all([
  //   getSettings(request, { uuid: cartResponse.data.uuid }),
  //   createCartSession(cartResponse.data),
  // ]);

  // Get settings
  // if (!settingsResponse.success) {
  //   throw internalError();
  // }
  // setApiLanguage(settingsResponse.data.language ?? parseAcceptLanguage(request));
  const [
    t,
    // updatedSettingsSession
  ] = await Promise.all([
    // getStoreFixedT({ request, uuid: cartResponse.data.uuid }),
    getStoreFixedT({ request, uuid: "123" }),
    // createSettingsSession(settingsResponse.data),
  ]);

  const basename = request.headers.get("x-remix-basename");

  console.log("root cspScriptNonce: ", cspScriptNonce);
  const data: RootLoaderData = {
    basename,
    // cart: cartResponse.data,
    cart: {},
    csrfToken,
    cspScriptNonce,
    title: t("routes.titles.root"),
    ENV: {
      IS_PRODUCTION: Environment.IS_PRODUCTION,
      ROUTER_PREFIX: Environment.ROUTER_PREFIX,
    },
    // settings: settingsResponse.data,
    settings: {},
    user,
  };

  const headers = new Headers();
  headers.append("Set-Cookie", await commitCsrfSession(csrfSession));

  // [updatedCartSession.headers, updatedSettingsSession.headers]
  //   .flatMap((headers) => Object.entries(headers))
  //   .forEach(([header, value]) => {
  //     headers.append(header, value);
  //   });

  return json(data, {
    headers,
  });
};

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: i18next.t("routes.titles.root") || "FamilyMart",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const links: LinksFunction = () => {
  return [
    // ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
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

const Document: FC<TDocumentProps> = ({
  cart,
  children,
  cspScriptNonce,
  env,
  settings,
}) => {
  const { i18n } = useTranslation();
  // const { storageLanguage, setStorageLanguage } = useLanguageStore();
  // const language = !isNil(settings) ? settings?.language?.toLowerCase() : DEFAULT_LANGUAGE;
  const language = DEFAULT_LANGUAGE;
  useInitLanguage(language);
  useInitDayjs();
  // const theme = !isNil(settings) ? (settings.theme as ETheme) : ETheme.Light;
  const theme = ETheme.Light;

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
        />
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
  const { cart, csrfToken, cspScriptNonce, ENV, settings, user } =
    useLoaderData<typeof loader>();
  const isMounted = useRef<boolean>(false);
  const changeLanguageState = useState(false);
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
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
            <Document
              cart={undefined}
              cspScriptNonce={cspScriptNonce}
              env={ENV}
              settings={settings}
            >
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
