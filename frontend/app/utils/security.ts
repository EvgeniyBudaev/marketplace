import { Environment } from "~/environment.server";

export const getContentSecurityPolicy = (nonce?: string): string => {
  let script_src: string;
  if (typeof nonce === "string" && nonce.length > 40) {
    script_src = `'self' 'nonce-${nonce}'`;
  } else if (!Environment.IS_PRODUCTION) {
    // Allow the <LiveReload /> component to load without a nonce in the error pages
    script_src = "'self' 'unsafe-inline'";
  } else {
    script_src = "'self'";
  }

  const connect_src = Environment.IS_PRODUCTION ? "'self' ws:" : "'self' ws://localhost:*";

  return (
    "default-src 'self'; " +
    `script-src ${script_src}; ` +
    `style-src 'self' https: 'unsafe-inline'; ` +
    "base-uri 'self'; " +
    "block-all-mixed-content; " +
    "child-src 'self'; " +
    `connect-src ${connect_src}; ` +
    "img-src 'self' data:; " +
    "font-src 'self' https: data:; " +
    "form-action 'self'; " +
    "frame-ancestors 'self'; " +
    "frame-src 'self'; " +
    "manifest-src 'self'; " +
    "media-src 'self'; " +
    "object-src 'none'; " +
    "prefetch-src 'self'; " +
    "script-src-attr 'none';" +
    "worker-src 'self' blob:; " +
    "upgrade-insecure-requests"
  );
};
