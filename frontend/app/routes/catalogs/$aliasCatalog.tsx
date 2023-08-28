import { Outlet } from "@remix-run/react";
import type { TBaseRouteHandle } from "~/types/routes";

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t, params) => {
      const { aliasCatalog = "" } = params;
      const BREADCRUMB_MAPPING = new Map([["mirrors", t("routes.titles.mirrors")]]);
      return BREADCRUMB_MAPPING.get(aliasCatalog);
    },
  },
};

export default function CatalogDetailRoute() {
  return <Outlet />;
}
