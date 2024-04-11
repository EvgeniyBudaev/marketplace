import { useEffect, useMemo } from "react";
import type { FC, PropsWithChildren } from "react";
import { useFetchers, useLocation, useNavigation } from "@remix-run/react";
import clsx from "clsx";
import NProgress from "nprogress";
import { ERoutes } from "#app/enums";
import type { TCart } from "#app/shared/api/cart";
import { Breadcrumbs, ETheme } from "#app/uikit";

import { Footer } from "./Footer";
import { Header } from "./Header";
import nProgressStyles from "nprogress/nprogress.css";
import styles from "./Layout.css";

type TProps = {
  cart?: TCart;
  className?: string;
  is404?: boolean;
  theme?: ETheme;
} & PropsWithChildren;

export const Layout: FC<TProps> = ({
  cart,
  className,
  children,
  is404,
  theme = ETheme.Light,
}) => {
  const isScroll = false;
  const { pathname } = useLocation();
  const fetchers = useFetchers();
  const navigation = useNavigation();

  let state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      let states = [
        navigation.state,
        ...fetchers.map((fetcher) => fetcher.state),
      ];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [navigation.state, fetchers]
  );

  useEffect(() => {
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [state, navigation.state]);

  return (
    <div className={clsx("Layout", className)}>
      <div className="Layout-Wrapper">
        <div className="Layout-Content">
          <Header cart={cart} theme={theme} />
          <main
            className={clsx("Layout-Main", {
              "Layout-Main__isScroll": isScroll,
            })}
          >
            {pathname === ERoutes.Root ? (
              <div className="Layout-ContainerHomePage">
                <Breadcrumbs />
                {children}
              </div>
            ) : (
              <div
                className={clsx("Layout-Container", {
                  "Layout-Container__is404": is404,
                })}
              >
                <Breadcrumbs />
                {children}
              </div>
            )}
          </main>
        </div>
        {pathname !== ERoutes.Shipping && !is404 && <Footer />}
      </div>
    </div>
  );
};

export function layoutLinks() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: nProgressStyles },
  ];
}
