import { redirect } from "@remix-run/node";
import isNil from "lodash/isNil.js";
import type { TUser } from "~/shared/api/users/types";
import { commitSession, destroySession, getSession } from "~/shared/session";
import type { TLogin } from "~/shared/api/auth/types";
import { refreshToken } from "./domain.server";

export const createUserSession = async (user: TUser, login: TLogin, redirectTo: string) => {
  const session = await getSession();
  session.set("token", {
    accessToken: login.access_token,
    refreshToken: login.refresh_token,
    expirationDate: login.expires_in,
    refreshExpirationDate: login.refresh_expires_in,
    tokenType: login.token_type,
  });
  session.set("accessToken", login.access_token);
  session.set("refreshToken", login.refresh_token);
  session.set("expirationDate", login.expires_in);
  session.set("refreshExpirationDate", login.refresh_expires_in);
  session.set("user", JSON.stringify(user));
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

// export const requireUserId = async (
//   request: Request,
//   redirectTo: string = new URL(request.url).pathname,
// ) => {
//   const session = await getSession(request.headers.get("Cookie"));
//   const userId = session.get("userId");
//   if (!userId) {
//     const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
//     return redirect(`/auth/login?${searchParams}`);
//   }
//   return userId;
// };

//Ryan Florence
export const getUserSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("user");
};

// export const requireUserSession = async (request: Request, next: (session: string) => Response) => {
//   const session = await getSession(request.headers.get("Cookie"));
//   const userSession = session.get("user");
//
//   // refresh ?
//
//   if (!userSession) {
//     return redirect("/auth/login", {
//       headers: {
//         "Set-Cookie": await destroySession(session),
//       }
//     });
//   }
//   return next(userSession);
// };

export const authenticate = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  try {
    let accessToken = session.get("accessToken");

    const expirationDate = session.get("expirationDate");

    if (isNil(accessToken) || isNil(expirationDate)) {
      throw new Error("No access token");
    }

    if (new Date(session.get("expirationDate")) < new Date()) {
      throw new Error("Expired");
    }

    return accessToken;
  } catch (error) {
    if (error instanceof Error && new Date(session.get("refreshExpirationDate")) > new Date()) {
      const refresh = await refreshToken(request, {
        refreshToken: session.get("refreshToken"),
      });

      if (refresh.success) {
        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expirationDate,
          refresh_expires_in: refreshExpirationDate,
        } = refresh.data;

        const headers = new Headers();

        // update the session with the new values
        session.set("accessToken", accessToken);
        session.set("refreshToken", refreshToken);
        session.set("expirationDate", expirationDate);
        session.set("refreshExpirationDate", refreshExpirationDate);

        // commit the session and append the Set-Cookie header
        headers.append("Set-Cookie", await commitSession(session));

        // redirect to the same URL if the request was a GET (loader)
        if (request.method === "GET") throw redirect(request.url, { headers });

        // return the access token so you can use it in your action
        return accessToken;
      }

      //throw error;
    } else {
      destroySession(session);
      // throw redirect("/auth/login", {
      //   headers: {
      //     "Set-Cookie": await destroySession(session),
      //   }
      // });
    }
  }
};
