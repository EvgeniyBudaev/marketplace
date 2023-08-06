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

const {
  API_URL,
  COOKIE_SECRET,
  COOKIE_SECURE,
  HOST_URL,
  NODE_ENV,
  REDIS_SESSION_HOST,
  REDIS_SESSION_PASSWORD,
  REDIS_SESSION_PORT,
  ROUTER_PREFIX,
  SETTINGS_STORAGE,
} = process.env;
invariant(API_URL, "API_URL must be set in env file");
invariant(COOKIE_SECRET, "COOKIE_SECRET must be set in env file");
invariant(COOKIE_SECURE, "COOKIE_SECURE must be set in env file");
invariant(HOST_URL, "HOST_URL must be set in env file");

/**
 * Переменные окружения
 */
export const Environment: EnvironmentType = {
  API_URL: API_URL ?? "",
  CACHE_TTL: 1800,
  COOKIE_SECRET: COOKIE_SECRET ?? "",
  COOKIE_SECURE: Boolean(COOKIE_SECURE),
  HOST_URL: HOST_URL ?? "",
  IS_PRODUCTION: NODE_ENV === "production",
  REDIS_SESSION_HOST: REDIS_SESSION_HOST ?? "",
  REDIS_SESSION_PORT: REDIS_SESSION_PORT ? parseInt(REDIS_SESSION_PORT) : 6379,
  REDIS_SESSION_PASSWORD: REDIS_SESSION_PASSWORD ?? "",
  SETTINGS_STORAGE: SETTINGS_STORAGE ?? "",
  ROUTER_PREFIX: ROUTER_PREFIX ?? "",
};
