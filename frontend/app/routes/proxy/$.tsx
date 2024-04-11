import { json, Response } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/server-runtime";

const COPIED_HEADERS = ["Content-Type"];
const ALLOWED_CONTENT_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/svg+xml",
  "image/webp",
];
const ALLOWED_HOSTS = ["w7.pngwing.com", "localhost:8080"];

export const loader: LoaderFunction = async ({ params }) => {
  const url = params["*"];
  if (!url) {
    throw json("Missing URL", { status: 400 });
  }

  let parsedUrl = undefined;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw json("Invalid URL", { status: 400 });
  }

  if (!ALLOWED_HOSTS.includes(parsedUrl.host)) {
    throw json("Forbidden host", { status: 400 });
  }

  const response = await fetch(url);

  if (
    !ALLOWED_CONTENT_TYPES.includes(response.headers.get("Content-Type") ?? "")
  ) {
    throw json("Forbidden response content type", { status: 400 });
  }

  return new Response(response.body, {
    headers: Object.fromEntries(
      COPIED_HEADERS.flatMap((header) => {
        const value = response.headers.get(header);
        return value ? [[header, value]] : [];
      })
    ),
  });
};
