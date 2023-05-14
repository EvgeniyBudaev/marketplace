import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { EPermissions, ERoutes } from "~/enums";
import { Admin, adminLinks } from "~/pages/Admin";
import { getStoreFixedT } from "~/shared/store";
import { checkRequestPermission } from "~/utils/permission";
import i18next from "i18next";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const [t, isPermissions] = await Promise.all([
    getStoreFixedT({ request }),
    checkRequestPermission(request, [EPermissions.Administrator]),
  ]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

  return json({
    title: t("routes.titles.admin"),
  });
};

let hydration = 0;
export const meta: MetaFunction = ({ data }) => {
  if (typeof window !== "undefined" && hydration) {
    return { title: i18next.t("routes.titles.admin") || "Admin panel" };
  }
  hydration++;
  return { title: data?.title || "Admin panel" };
};

export default function AdminRoute() {
  return <Admin />;
}

export function links() {
  return [...adminLinks()];
}
