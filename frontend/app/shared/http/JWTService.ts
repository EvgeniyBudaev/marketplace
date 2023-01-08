import { redirect } from "@remix-run/node";
import type { SessionStorage } from "@remix-run/node";
import jwtDecode from "jwt-decode";
import { THeaders, TRefreshAccessTokenReturn } from "./types";

export type TJWTServiceParams = {
  sessionStorage: SessionStorage;
  baseUrl: string;
};

export class JWTService {
  private sessionStorage: SessionStorage;
  private readonly baseUrl: string;

  constructor({ sessionStorage, baseUrl }: TJWTServiceParams) {
    this.sessionStorage = sessionStorage;
    this.baseUrl = baseUrl;
  }

  private async getSessionData(request: Request) {
    console.log("[getSessionData]");
    const session = await this.sessionStorage.getSession(request.headers.get("Cookie"));

    return session.get("token");
  }

  private async getTokenSetHeaders(request: Request, accessToken: string): Promise<THeaders> {
    console.log("[getTokenSetHeaders]");
    const session = await this.sessionStorage.getSession(request.headers.get("Cookie"));
    session.set("accessToken", { accessToken: accessToken });

    return {
      "Set-Cookie": await this.sessionStorage.commitSession(session),
    };
  }

  async refreshAccessToken(request: Request): Promise<any> {
    console.log("[refreshAccessToken]");
    const sessionData = (await this.getSessionData(request)) ?? {};

    if (!sessionData?.refreshToken) {
      await this.logout(request);
    }

    const params = {
      refreshToken: sessionData.refreshToken,
    };

    let response: Response;

    try {
      response = await fetch("http://localhost:8080/api/v1/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    } catch (error) {
      throw error;
    }

    if (!response.ok) {
      await this.logout(request);
    }

    let accessToken: string;

    try {
      const refreshResponse = await response.json();
      console.log("[refreshResponse] ", refreshResponse);
      accessToken = refreshResponse.access_token;

      const session = await this.sessionStorage.getSession(request.headers.get("Cookie"));
      const headers = new Headers();
      // session.set("token", refreshResponse);
      // headers.append("Set-Cookie", await this.sessionStorage.commitSession(session));
      //if (request.method === "GET") throw redirect(request.url, { headers });
    } catch (error) {
      const msg = "Refresh access token response JSON is invalid";
      throw error;
    }

    if (!accessToken) {
      await this.logout(request);
    }

    // const headers = await this.getTokenSetHeaders(request, accessToken);
    // return { accessToken, headers };
    return { accessToken };
  }

  async checkIfNeedToRefreshToken(request: Request): Promise<boolean> {
    console.log("[checkIfNeedToRefreshToken]");
    const TOKEN_EXPIRES_IN_TO_REFRESH_DIVISOR = 3;
    const sessionData = (await this.getSessionData(request)) ?? {};
    console.log("[sessionData] ", sessionData);

    if (!sessionData?.accessToken || !sessionData?.expirationDate) {
      return false;
      // return true;
    }

    return new Date(sessionData?.expirationDate) < new Date();

    // const decodedToken = jwtDecode(sessionData.accessToken) as { exp: number };
    // const remainedTime = decodedToken.exp - new Date().getTime() / 1000;
    // const timeToRefresh = sessionData.expirationDate / TOKEN_EXPIRES_IN_TO_REFRESH_DIVISOR;
    // console.log("[TIME Check] ", remainedTime < timeToRefresh);
    // return remainedTime < timeToRefresh;
  }

  public setAccessToken(request: Request, accessToken: string): void {
    console.log("[setAccessToken]");
    // const ACCESS_TOKEN_HEADER_NAME = 'X-Access-Token'
    // request.headers.set(ACCESS_TOKEN_HEADER_NAME, accessToken);
  }

  private async getTokenRemoveHeaders(request: Request): Promise<THeaders> {
    console.log("[getTokenRemoveHeaders]");
    const session = await this.sessionStorage.getSession(request.headers.get("Cookie"));

    return {
      "Set-Cookie": await this.sessionStorage.destroySession(session),
    };
  }

  async logout(request: Request) {
    console.log("[logout]");
    const headers = await this.getTokenRemoveHeaders(request);

    // throw redirect("/", {
    //     headers,
    // });
  }
}
