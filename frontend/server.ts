import compression from "compression";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import path from "path";
import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import {
  SOCKET_RECEIVE_LANGUAGE,
  SOCKET_RECEIVE_THEME,
  SOCKET_SEND_LANGUAGE,
  SOCKET_SEND_THEME,
} from "./app/constants/socket";
import { registerAccessTokenRefresh } from "./app/shared/http";
import { sessionStorage } from "./app/shared/session";
import { Server } from "socket.io";

installGlobals();

const BUILD_DIR = path.join(process.cwd(), "build");
const MODE = process.env.NODE_ENV;
const isProduction = MODE === "production";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on(SOCKET_SEND_LANGUAGE, (data) => {
    // socket.broadcast.emit(SOCKET_RECEIVE_LANGUAGE, data);
    socket.emit(SOCKET_RECEIVE_LANGUAGE, data);
  });
  socket.on(SOCKET_SEND_THEME, (data) => {
    socket.broadcast.emit(SOCKET_RECEIVE_THEME, data);
    // socket.emit(SOCKET_RECEIVE_THEME, data);
  });
});

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

app.use(
  helmet.crossOriginEmbedderPolicy({
    policy: "credentialless",
  }),
);
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use((req, res, next) => {
  // helpful headers:
  res.set("Strict-Transport-Security", `max-age=${60 * 60 * 24 * 365 * 100}`);

  let hostUrlObj;

  try {
    hostUrlObj = new URL(process.env.HOST_URL as string);
  } catch (e) {
    next();
    return;
  }

  // /clean-urls/ -> /clean-urls
  if (req.path.endsWith("/") && req.path.length > 1 && hostUrlObj.hostname === req.hostname) {
    const query = req.url.slice(req.path.length);
    const safePath = req.path.slice(0, -1).replace(/\/+/g, "/");
    res.redirect(301, safePath + query);
    return;
  }
  next();
});

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use("/build", express.static("public/build", { immutable: true, maxAge: "1y" }));

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

function loadBuild() {
  let build = require(BUILD_DIR);
  build = registerAccessTokenRefresh(
    build,
    {
      sessionStorage: sessionStorage,
      baseName: process.env.ROUTER_PREFIX,
      baseUrl: process.env.API_URL ?? "",
    },
    ["routes/"],
  );

  return build;
}

app.all(
  "*",
  isProduction
    ? createRequestHandler({
        build: loadBuild(),
      })
    : (...args) => {
        purgeRequireCache();
        const requestHandler = createRequestHandler({
          build: loadBuild(),
          mode: MODE,
        });
        return requestHandler(...args);
      },
);

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (let key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
