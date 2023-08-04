import invariant from "tiny-invariant";

export type EnvironmentType = {
  API_URL: string;
  CACHE_TTL: number;
  COOKIE_SECRET: string;
  COOKIE_SECURE: boolean;
  HOST_URL: string;
  IS_PRODUCTION: boolean;
  SETTINGS_STORAGE: string;
  REDIS_SESSION_HOST: string;
  REDIS_SESSION_PORT: number;
  REDIS_SESSION_PASSWORD?: string;
  ROUTER_PREFIX?: string;
};

const { API_URL, COOKIE_SECRET, COOKIE_SECURE, HOST_URL, NODE_ENV, ROUTER_PREFIX } = process.env;
console.log("[Environment ROUTER_PREFIX]", ROUTER_PREFIX);
// invariant(API_URL, "API_URL must be set in env file");
// invariant(COOKIE_SECRET, "COOKIE_SECRET must be set in env file");
// invariant(COOKIE_SECURE, "COOKIE_SECURE must be set in env file");
// invariant(HOST_URL, "HOST_URL must be set in env file");

/**
 * Переменные окружения
 */
export const Environment: EnvironmentType = {
  API_URL: "http://localhost:8080",
  CACHE_TTL: 1800,
  COOKIE_SECRET: "secret_key",
  COOKIE_SECURE: COOKIE_SECURE === "true",
  HOST_URL: "http://localhost:3000",
  IS_PRODUCTION: NODE_ENV === "production",
  REDIS_SESSION_HOST: "localhost" ?? "",
  REDIS_SESSION_PORT: "55000" ? parseInt("55000") : 6379,
  REDIS_SESSION_PASSWORD: "redispw",
  SETTINGS_STORAGE: "Memory",
  ROUTER_PREFIX: ROUTER_PREFIX ?? "",
};
