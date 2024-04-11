import type { TFunction } from "i18next";
import type { ParsedQs } from "qs";
import type { Session } from "@remix-run/node";

export type TCheckCSRFTokenResponse = {
  error?: Promise<Response>;
  success: boolean;
};

export type TCheckCSRFTokenParams = {
  csrfToken?: string | ParsedQs | string[] | ParsedQs[] | null;
  session: Session;
  t: TFunction<"translation", undefined, "translation">;
};

export type TCheckCSRFToken = (
  params: TCheckCSRFTokenParams
) => TCheckCSRFTokenResponse;
