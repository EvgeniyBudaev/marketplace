import { redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { EPermissions, ERoutes } from "~/enums";
import { Admin, adminLinks } from "~/pages/Admin";
import { checkRequestPermission } from "~/utils/permission";

export const loader = async (args: LoaderArgs) => {
  const { request } = args;

  const isPermissions = await checkRequestPermission(request, [EPermissions.Administrator]);

  if (!isPermissions) {
    return redirect(ERoutes.Login);
  }

  return null;
};

export default function AdminRoute() {
  return <Admin />;
}

export function links() {
  return [...adminLinks()];
}
