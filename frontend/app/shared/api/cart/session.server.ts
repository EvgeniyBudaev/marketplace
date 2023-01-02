import type {Session} from "@remix-run/node";
import {CartSession, getSession} from "~/shared/session";

export const createCartSession = async (request: Request, cart: any) => {
  const session = await getCartSession(request);
  session.set("__cart", JSON.stringify(cart));
};

// export const getCartSession = async (request: Request) => {
//   const session = await getSession(request.headers.get("Cookie"));
//   return session.get("__cart");
// };

export const cartSessionStorage = CartSession.storage;

export const getCartSession = async (request: Request): Promise<Session> => {
  return await cartSessionStorage.getSession(request.headers.get("Cookie"));
};

export const { commitSession: commitCartSession } = cartSessionStorage;