import { Outlet } from "@remix-run/react";
import type { TBaseRouteHandle } from "#app/types/routes";

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.order"),
  },
};

export default function OrderRoute() {
  return <Outlet />;
}
