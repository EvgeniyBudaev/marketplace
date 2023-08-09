import { Outlet } from "@remix-run/react";
import type { TBaseRouteHandle } from "~/types/routes";

export const handle: TBaseRouteHandle = {
  breadcrumb: {
    title: (t) => t("routes.titles.admin"),
  },
};

export default function AdminRoute() {
  return <Outlet />;
}
