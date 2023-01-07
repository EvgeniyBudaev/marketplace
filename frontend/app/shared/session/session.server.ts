import { createCookieSessionStorage } from "@remix-run/node";
import type { Session } from "@remix-run/node";
import { CsrfSession } from "~/shared/session";

export const csrfSessionStorage = CsrfSession.storage;

export const getCsrfSession = async (request: Request): Promise<Session> => {
  return await csrfSessionStorage.getSession(request.headers.get("Cookie"));
};

export const { commitSession: commitCsrfSession } = csrfSessionStorage;

const { COOKIE_SECRET, SESSION_SECRET } = process.env;
if (!SESSION_SECRET) throw new Error("You need to set a SESSION_SECRET environment variable");
if (!COOKIE_SECRET) throw new Error("You need to set a COOKIE_SECRET environment variable");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    //domain: "remix.run",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [COOKIE_SECRET || "secret"],
    secure: true,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
