import { flatRoutes } from "./app/utils/flatRoutes.js";
import "dotenv/config";

const BASE_PATH = process.env.ROUTER_PREFIX;

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  serverDependenciesToBundle: [
    /^remix-utils.*/,
    "is-ip",
    "ip-regex",
    "super-regex",
    "clone-regexp",
    "function-timeout",
    "time-span",
    "convert-hrtime",
    "is-regexp",
    "crypto-random-string",
    /lodash-es/
  ],
  devServerPort: 8002,
  ...(!BASE_PATH && {
    ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  }),
  ...(BASE_PATH && {
    ignoredRouteFiles: ["*/**"],
    publicPath: "/__remix__/build/",
    assetsBuildDirectory: "public/__remix__/build/",
    routes: async (defineRoutes) => {
      return flatRoutes("routes", defineRoutes, {
        basePath: BASE_PATH,
      });
    },
  }),
  future: {
    v2_routeConvention: true,
  },
};
