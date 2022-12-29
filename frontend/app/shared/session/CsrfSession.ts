import type { SessionStorage } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";

const defaultArgs = {
  cookie: {
    name: "__csrf",
  },
};

export class CsrfSession {
  static storage: SessionStorage = createCookieSessionStorage(defaultArgs);

  static init(...args: Parameters<typeof createCookieSessionStorage>): void {
    CsrfSession.storage = createCookieSessionStorage({
      ...defaultArgs,
      ...args[0],
    });
  }
}
