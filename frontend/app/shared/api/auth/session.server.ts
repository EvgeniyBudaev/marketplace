import { createCookieSessionStorage, Session, redirect } from "@remix-run/node";
import { CsrfSession } from "~/shared/session";

export const csrfSessionStorage = CsrfSession.storage;

export const getCsrfSession = async (request: Request): Promise<Session> => {
  return await csrfSessionStorage.getSession(request.headers.get("Cookie"));
};

export const { commitSession: commitCsrfSession } = csrfSessionStorage;

//DEMO
const { COOKIE_SECRET, SESSION_SECRET } = process.env;
if (!SESSION_SECRET) throw new Error("You need to set a SESSION_SECRET environment variable");
if (!COOKIE_SECRET) throw new Error("You need to set a COOKIE_SECRET environment variable");

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    //domain: "remix.run",
    httpOnly: true,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secrets: [COOKIE_SECRET || "secret"],
    secure: true,
  },
});

export { getSession, commitSession, destroySession };

export const createUserSession = async (userId: number, redirectTo: string) => {
  const session = await getSession();
  session.set("userId", userId);
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
