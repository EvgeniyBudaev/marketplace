// import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
// import { ERoutes } from "#app/enums";
import { Home, homeLinks } from "#app/pages/Home";
import type { TBaseRouteHandle } from "#app/types";

export const loader = async (args: LoaderFunctionArgs) => {
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
