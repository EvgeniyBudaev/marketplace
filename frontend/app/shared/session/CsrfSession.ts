import type { SessionStorage } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";

export class CsrfSession {
  static storage: SessionStorage = createCookieSessionStorage();

  static init(...args: Parameters<typeof createCookieSessionStorage>): void {
    CsrfSession.storage = createCookieSessionStorage(...args);
  }
}
