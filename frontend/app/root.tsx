import type { FC, ReactNode } from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import { Layout, links as componentsLinks } from "~/components";
import { links as uikitLinks } from "~/uikit";

import styles from "../styles/app.css";

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
};

const Document: FC<TDocumentProps> = ({ children }) => {
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
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
