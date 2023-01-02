import { redirect } from "@remix-run/node";
import type { TUser } from "~/shared/api/users/types";
import { commitSession, getSession } from "~/shared/session";

export const createUserSession = async (user: TUser, redirectTo: string) => {
  const session = await getSession();
  session.set("user", JSON.stringify(user));
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const requireUserId = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname,
) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    return redirect(`/auth/login?${searchParams}`);
  }
  return userId;
};

//Ryan Florence
export const getUserSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("user");
};

export const requireUserSession = async (request: Request, next: (session: string) => Response) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userSession = session.get("user");
  if (!userSession) {
    return redirect("/auth/login");
  }
  return next(userSession);
};
