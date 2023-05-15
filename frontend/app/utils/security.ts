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
    `script-src https://api-maps.yandex.ru https://suggest-maps.yandex.ru http://*.maps.yandex.net https://yandex.ru https://yastatic.net ${script_src}; ` +
    `script-src-elem https://api-maps.yandex.ru https://suggest-maps.yandex.ru http://*.maps.yandex.net https://yandex.ru https://yastatic.net ${script_src};` +
    `style-src 'self' https: 'unsafe-inline'; ` +
    "base-uri 'self'; " +
    "block-all-mixed-content; " +
    "child-src https://api-maps.yandex.ru 'self'; " +
    `connect-src https://api-maps.yandex.ru https://suggest-maps.yandex.ru https://*.maps.yandex.net https://yandex.ru https://*.taxi.yandex.net ${connect_src}; ` +
    "img-src 'self' blob: data: https://*.maps.yandex.net https://api-maps.yandex.ru https://yandex.ru;" +
    "font-src 'self' https: data:; " +
    "form-action 'self'; " +
    "frame-ancestors 'self'; " +
    "frame-src https://api-maps.yandex.ru 'self'; " +
    "manifest-src 'self'; " +
    "media-src 'self'; " +
    "object-src 'none'; " +
    // "prefetch-src 'self'; " +
    "script-src-attr 'none';" +
    "worker-src 'self' blob:; " +
    "upgrade-insecure-requests"
  );
};
