import { LoaderArgs, redirect } from "@remix-run/node";
import { ERoutes } from "~/enums";

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  return redirect(ERoutes.Root);
};

export default function ActivateRoute() {
  return null;
}
