import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { ERoutes } from "#app/enums";
import { getUserSession } from "#app/shared/api/auth";
import { destroySession, getSession } from "#app/shared/session";
import { createPath } from "#app/utils";

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;
  console.log("[action logout]");
  const cookieSession = await getSession(request.headers.get("Cookie"));
  const userSession = await getUserSession(request);

  return redirect(createPath({ route: ERoutes.Login }), {
    headers: {
      "Set-Cookie": await destroySession(cookieSession),
    },
  });
};

export default function LogoutRoute() {
  return null;
}
