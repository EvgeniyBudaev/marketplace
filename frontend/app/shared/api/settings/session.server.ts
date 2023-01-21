import type { SessionStorage } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";
import { TSettings } from "~/shared/api/settings";

const { COOKIE_SECRET } = process.env;

const defaultArgs = {
  cookie: {
    name: "__settings",
    httpOnly: true,
    path: "/",
    // sameSite: "lax",
    secrets: [COOKIE_SECRET || "secret"],
    secure: true,
  },
};

export class SettingsSession {
  static storage: SessionStorage = createCookieSessionStorage(defaultArgs);

  static init(...args: Parameters<typeof createCookieSessionStorage>): void {
    SettingsSession.storage = createCookieSessionStorage({
      ...defaultArgs,
      ...args[0],
    });
  }
}

export const createSettingsSession = async (settings: TSettings) => {
  const session = await SettingsSession.storage.getSession();
  session.set("settings", JSON.stringify(settings));
  return {
    headers: {
      "Set-Cookie": await SettingsSession.storage.commitSession(session),
    },
  };
};

export const getSettingsSession = async (request: Request) => {
  const session = await SettingsSession.storage.getSession(request.headers.get("Cookie"));
  return session.get("settings");
};
