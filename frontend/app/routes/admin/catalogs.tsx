import { Outlet } from "@remix-run/react";
import type { TBaseRouteHandle } from "#app/types/routes";

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.catalogs"),
  },
};

export default function CatalogsRoute() {
  return <Outlet />;
}
