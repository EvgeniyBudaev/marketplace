import { redirect } from "@remix-run/node";
import type { SessionStorage } from "@remix-run/node";
import jwtDecode from "jwt-decode";
import { THeaders, TRefreshAccessTokenReturn } from "./types";

export type TJWTServiceParams = {
  sessionStorage: SessionStorage;
  baseName?: string | null;
  baseUrl: string;
};

export type TTokenSessionData = {
  accessToken?: string;
  refreshToken?: string;
  expirationDate?: string;
  refreshExpirationDate?: string;
  tokenType?: string;
};

export type TTokenData = {
  sub: string;
  roles: string[];
  exp: number;
  iat: number;
};

export class JWTService {
  private sessionStorage: SessionStorage;
  private readonly baseName?: string | null;
  private readonly baseUrl: string;

  constructor({ sessionStorage, baseName, baseUrl }: TJWTServiceParams) {
    this.sessionStorage = sessionStorage;
    this.baseName = baseName;
    this.baseUrl = baseUrl;
  }

  private async getSessionData(request: Request) {
    const session = await this.sessionStorage.getSession(
      request.headers.get("Cookie")
    );
    return session.get("token");
  }

  private getTokenData(sessionData: TTokenSessionData) {
    return (
      sessionData.accessToken &&
      (jwtDecode(sessionData.accessToken) as TTokenData)
    );
  }

  async refreshAccessToken(
    request: Request
  ): Promise<TRefreshAccessTokenReturn> {
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
      accessToken = refreshResponse.access_token;

      const session = await this.sessionStorage.getSession(
        request.headers.get("Cookie")
      );
      const headers = new Headers();

      const tokenSessionData: TTokenSessionData = {
        accessToken: refreshResponse.access_token,
        refreshToken: refreshResponse.refresh_token,
        expirationDate: refreshResponse.expires_in,
        refreshExpirationDate: refreshResponse.refresh_expires_in,
        tokenType: refreshResponse.token_type,
      };

      session.set("token", tokenSessionData);
      headers.append(
        "Set-Cookie",
        await this.sessionStorage.commitSession(session)
      );
      if (request.method === "GET") throw redirect(request.url, { headers });
    } catch (error) {
      throw error;
    }

    if (!accessToken) {
      await this.logout(request);
    }

    return { accessToken };
  }

  async checkIfNeedToRefreshToken(request: Request): Promise<boolean> {
    const sessionData = (await this.getSessionData(request)) ?? {};
    const tokenData = this.getTokenData(sessionData);

    if (!tokenData) {
      return false;
    }

    return new Date(tokenData.exp * 1000) < new Date();
  }

  private async getTokenRemoveHeaders(request: Request): Promise<THeaders> {
    const session = await this.sessionStorage.getSession(
      request.headers.get("Cookie")
    );

    return {
      "Set-Cookie": await this.sessionStorage.destroySession(session),
    };
  }

  async logout(request: Request) {
    const headers = await this.getTokenRemoveHeaders(request);
    const redirectUrl = (this.baseName || "") + "/login";
    throw redirect(redirectUrl, {
      headers,
    });
  }
}
