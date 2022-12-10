import type { FC, PropsWithChildren } from "react";
import { useLocation } from "@remix-run/react";
import clsx from "clsx";
import { ROUTES } from "~/constants";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./Layout.module.css";

type TProps = {
  className?: string;
  is404?: boolean;
} & PropsWithChildren;

export const Layout: FC<TProps> = ({ className, children, is404 }) => {
  const isScroll = false;
  const { pathname } = useLocation();

  return (
    <div className={clsx("Layout", className)}>
      <div className="Layout-Wrapper">
        <div className="Layout-Content">
          <Header />
          <main
            className={clsx("Layout-Main", {
              "Layout-Main__isScroll": isScroll,
            })}
          >
            {pathname === ROUTES.HOME ? (
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
        {pathname !== ROUTES.SHIPPING && !is404 && <Footer />}
      </div>
    </div>
  );
};

export function layoutLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
