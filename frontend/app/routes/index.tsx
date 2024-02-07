import type { LoaderFunctionArgs } from "@remix-run/node";
import { Home, homeLinks } from "~/pages/Home";
import type { TBaseRouteHandle } from "~/types";

export const loader = async (args: LoaderFunctionArgs) => {
  return null;
};

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.root"),
  },
};

export default function Index() {
  return <Home />;
}

export function links() {
  return [...homeLinks()];
}
