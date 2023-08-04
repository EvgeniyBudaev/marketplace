import { LoaderArgs, redirect } from "@remix-run/node";
import { ERoutes } from "~/enums";
import { createPath } from "~/utils";

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  return redirect(createPath({ route: ERoutes.Root }));
};

export default function ActivateRoute() {
  return null;
}
