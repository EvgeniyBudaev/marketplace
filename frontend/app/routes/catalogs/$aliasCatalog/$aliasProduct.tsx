import { Outlet } from "@remix-run/react";
import type { TBaseRouteHandle } from "~/types/routes";

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.product"),
  },
};

export default function ProductDetailRoute() {
  return <Outlet />;
}
