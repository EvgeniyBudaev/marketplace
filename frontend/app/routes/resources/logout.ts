import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { ERoutes } from "~/enums";
import { getUserSession } from "~/shared/api/auth";
import { destroySession, getSession } from "~/shared/session";

export const action = async (args: ActionArgs) => {
  const { request } = args;
  console.log("[action logout]");
  const cookieSession = await getSession(request.headers.get("Cookie"));
  const userSession = await getUserSession(request);

  return redirect(ERoutes.Login, {
    headers: {
      "Set-Cookie": await destroySession(cookieSession),
    },
  });
};

export default function LogoutRoute() {
  return null;
}
