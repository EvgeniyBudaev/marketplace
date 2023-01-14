import type { SessionStorage } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";
import { TCart } from "~/shared/api/cart";
import { commitSession, getSession } from "~/shared/session";

const { COOKIE_SECRET } = process.env;

const defaultArgs = {
  cookie: {
    name: "__cart",
    httpOnly: true,
    path: "/",
    // sameSite: "lax",
    secrets: [COOKIE_SECRET || "secret"],
    secure: true,
  },
};

export class CartSession {
  static storage: SessionStorage = createCookieSessionStorage(defaultArgs);

  static init(...args: Parameters<typeof createCookieSessionStorage>): void {
    CartSession.storage = createCookieSessionStorage({
      ...defaultArgs,
      ...args[0],
    });
  }
}

export const createCartSession = async (cart: TCart) => {
  const session = await CartSession.storage.getSession();
  session.set("cart", JSON.stringify(cart));
  return {
    headers: {
      "Set-Cookie": await CartSession.storage.commitSession(session),
    },
  };
};

export const getCartSession = async (request: Request) => {
  const session = await CartSession.storage.getSession(request.headers.get("Cookie"));
  return session.get("cart");
};
