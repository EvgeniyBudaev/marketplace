import { CSRF } from "remix-utils/csrf/server";
import { createCookie } from "@remix-run/node";

const cookie = createCookie("csrfServer", {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  secrets: ["s3cr3t"],
});

export const csrf = new CSRF({
  cookie,
  // what key in FormData objects will be used for the token, defaults to `csrfServer`
  formDataKey: "csrfServer",
  // an optional secret used to sign the token, recommended for extra safety
  secret: "s3cr3t",
});