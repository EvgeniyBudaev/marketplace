import invariant from "tiny-invariant";

export type EnvironmentType = {
  API_URL: string;
  COOKIE_SECRET: string;
  COOKIE_SECURE: boolean;
  HOST_URL: string;
  IS_PRODUCTION: boolean;
};

const { API_URL, COOKIE_SECRET, COOKIE_SECURE, HOST_URL, NODE_ENV } = process.env;

invariant(API_URL, "API_URL must be set in env file");
invariant(COOKIE_SECRET, "COOKIE_SECRET must be set in env file");
invariant(COOKIE_SECURE, "COOKIE_SECURE must be set in env file");
invariant(HOST_URL, "HOST_URL must be set in env file");

/**
 * Переменные окружения
 */
export const Environment: EnvironmentType = {
  API_URL: API_URL,
  COOKIE_SECRET: COOKIE_SECRET,
  COOKIE_SECURE: COOKIE_SECURE === "true",
  HOST_URL: HOST_URL,
  IS_PRODUCTION: NODE_ENV === "production",
};