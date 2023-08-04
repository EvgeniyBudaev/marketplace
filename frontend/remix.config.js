const { flatRoutes } = require("./app/utils/flatRoutes");
require("dotenv/config");

const BASE_PATH = process.env.ROUTER_PREFIX;

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverDependenciesToBundle: ["crypto-random-string", /lodash-es/],
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
    v2_meta: true,
  },
};
