// import { redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
// import { ERoutes } from "~/enums";
import { Home, homeLinks } from "~/pages/Home";
import type { TBaseRouteHandle } from "~/types";

export const loader = async (args: LoaderArgs) => {
  //return redirect(ERoutes.CatalogMirrors);
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
