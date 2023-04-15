import { Response } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { badRequest } from "remix-utils";

const COPIED_HEADERS = ["Content-Type"];
const ALLOWED_CONTENT_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/svg+xml",
  "image/webp",
];
const ALLOWED_HOSTS = ["www.semashko.com", "localhost:8080"];

export const loader: LoaderFunction = async ({ params }) => {
  const url = params["*"];
  if (!url) {
    throw badRequest("Missing URL");
  }

  let parsedUrl = undefined;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw badRequest("Invalid URL");
  }

  if (!ALLOWED_HOSTS.includes(parsedUrl.host)) {
    throw badRequest("Forbidden host");
  }

  const response = await fetch(url);

  if (!ALLOWED_CONTENT_TYPES.includes(response.headers.get("Content-Type") ?? "")) {
    throw badRequest("Forbidden response content type");
  }

  return new Response(response.body, {
    headers: Object.fromEntries(
      COPIED_HEADERS.flatMap((header) => {
        const value = response.headers.get(header);
        return value ? [[header, value]] : [];
      }),
    ),
  });
};
