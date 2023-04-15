import { useEffect, useMemo } from "react";
import type { FC, PropsWithChildren } from "react";
import { useFetchers, useLocation, useTransition } from "@remix-run/react";
import clsx from "clsx";
import NProgress from "nprogress";
import { ERoutes } from "~/enums";
import type { TCart } from "~/shared/api/cart";
import { ETheme } from "~/uikit";

import { Footer } from "./Footer";
import { Header } from "./Header";
import nProgressStyles from "nprogress/nprogress.css";
import styles from "./Layout.module.css";

type TProps = {
  cart?: TCart;
  className?: string;
  is404?: boolean;
  theme?: ETheme;
} & PropsWithChildren;

export const Layout: FC<TProps> = ({ cart, className, children, is404, theme = ETheme.Light }) => {
  const isScroll = false;
  const { pathname } = useLocation();
  const fetchers = useFetchers();
  const transition = useTransition();

  let state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      let states = [transition.state, ...fetchers.map((fetcher) => fetcher.state)];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [transition.state, fetchers],
  );

  useEffect(() => {
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [state, transition.state]);

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
              <div className="Layout-ContainerHomePage">{children}</div>
            ) : (
              <div
                className={clsx("Layout-Container", {
                  "Layout-Container__is404": is404,
                })}
              >
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
