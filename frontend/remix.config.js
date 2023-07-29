/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    "crypto-random-string",
    /@ant-design\/*/,
    /@antv\/*/,
    /d3-interpolate/,
    /d3-color/,
    /lodash-es/,
  ],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
