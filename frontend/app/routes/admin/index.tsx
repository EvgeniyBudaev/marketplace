import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import i18next from "i18next";
import { EPermissions, ERoutes } from "#app/enums";
import { Admin, adminLinks } from "#app/pages/Admin";
import { getStoreFixedT } from "#app/shared/store";
import { createPath } from "#app/utils";
import { checkRequestPermission } from "#app/utils/permission";

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(createPath({ route: ERoutes.Login }));
  }

  return json({
    title: t("routes.titles.admin"),
  });
};

export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined") {
    return [{ title: i18next.t("routes.titles.admin") || "Admin panel" }];
  }
  return [{ title: data?.title || "Admin panel" }];
};

export default function AdminIndexRoute() {
  return <Admin />;
}

export function links() {
  return [...adminLinks()];
}
