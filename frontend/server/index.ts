import { createExpressApp } from "remix-express-vite-plugin/express";
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
} from "#app/constants/socket";
import { registerAccessTokenRefresh } from "#app/shared/http";
import { sessionStorage } from "#app/shared/session";
import { Server } from "socket.io";
import type { ServerBuild } from "@remix-run/server-runtime";

// you can import modules from your app directory and use in your express app
import { sayHello } from "#app/hello";

declare module "@remix-run/node" {
  interface AppLoadContext {
    hello: () => string;
  }
}

export default createExpressApp({
  configure: (app) => {
    console.log("Server is running");
    installGlobals();

    const BUILD_DIR = path.join(process.cwd(), "build");
    const MODE = process.env.NODE_ENV;
    const isProduction = MODE === "production";

    // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
    app.disable("x-powered-by");

    app.use(
      helmet.crossOriginEmbedderPolicy({
        policy: "credentialless",
      })
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
      res.set(
        "Strict-Transport-Security",
        `max-age=${60 * 60 * 24 * 365 * 100}`
      );
      let hostUrlObj;
      try {
        hostUrlObj = new URL(process.env.HOST_URL as string);
      } catch (e) {
        next();
        return;
      }
      // /clean-urls/ -> /clean-urls
      if (
        req.path.endsWith("/") &&
        req.path.length > 1 &&
        hostUrlObj.hostname === req.hostname
      ) {
        const query = req.url.slice(req.path.length);
        const safePath = req.path.slice(0, -1).replace(/\/+/g, "/");
        res.redirect(301, safePath + query);
        return;
      }
      next();
    });
    app.use(compression());
    app.disable("x-powered-by");
    app.use(
      "/build",
      express.static("public/build", { immutable: true, maxAge: "1y" })
    );
    app.use(express.static("public", { maxAge: "1h" }));

    let viteDevServer;
    const r = async () => {
      viteDevServer =
        process.env.NODE_ENV === "production"
          ? undefined
          : await createServer({ server: { middlewareMode: true } });
    };
    r().then(() => {
      // Определение функции для загрузки сборки
      const loadBuild = async (): Promise<ServerBuild> => {
        if (viteDevServer) {
          // Загрузка сборки через Vite в режиме разработки
          return viteDevServer.ssrLoadModule("virtual:remix/server-build");
        } else {
          // Загрузка сборки напрямую в режиме продакшена
          const buildPath = path.join(
            process.cwd(),
            "..",
            "build",
            "server",
            "index.js"
          );
          console.log("[buildPath] ", buildPath);
          /* @vite-ignore */
          return await import(buildPath);
        }
      };

      // Обработка SSR запросов
      app.all(
        "*",
        createRequestHandler({
          build: loadBuild, // Передача функции, возвращающей Promise<ServerBuild>
        })
      );
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLoadContext: async (req, res) => {
    // custom load context should match the AppLoadContext interface defined above
    return { hello: sayHello };
  },
});
