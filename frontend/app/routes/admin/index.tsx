import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { EPermissions, ERoutes } from "~/enums";
import { Admin, adminLinks } from "~/pages/Admin";
import { getStoreFixedT } from "~/shared/store";
import { checkRequestPermission } from "~/utils/permission";
import i18next from "i18next";
import { createPath } from "~/utils";

export const loader = async (args: LoaderArgs) => {
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

// export const meta: MetaFunction = ({ data }) => {
//   if (typeof window !== "undefined") {
//     return { title: i18next.t("routes.titles.admin") || "Admin panel" };
//   }
//   return { title: data?.title || "Admin panel" };
// };

export default function AdminRoute() {
  return <Admin />;
}

export function links() {
  return [...adminLinks()];
}
