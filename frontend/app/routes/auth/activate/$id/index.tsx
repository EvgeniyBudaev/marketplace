import { redirect } from "@remix-run/node";
import { ERoutes } from "#app/enums";
import { createPath } from "#app/utils";

export const loader = async () => {
  return redirect(createPath({ route: ERoutes.Root }));
};

export default function ActivateRoute() {
  return null;
}
