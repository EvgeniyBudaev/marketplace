import invariant from "tiny-invariant";

export type EnvironmentType = {
  API_URL: string;
  COOKIE_SECRET: string;
  COOKIE_SECURE: boolean;
  HOST_URL: string;
  IS_PRODUCTION: boolean;
};

const { API_URL, COOKIE_SECRET, COOKIE_SECURE, HOST_URL, NODE_ENV } = process.env;

// invariant(API_URL, "API_URL must be set in env file");
// invariant(COOKIE_SECRET, "COOKIE_SECRET must be set in env file");
// invariant(COOKIE_SECURE, "COOKIE_SECURE must be set in env file");
// invariant(HOST_URL, "HOST_URL must be set in env file");

/**
 * Переменные окружения
 */
export const Environment: EnvironmentType = {
  API_URL: "http://localhost:8080",
  COOKIE_SECRET: "secret_key",
  COOKIE_SECURE: COOKIE_SECURE === "true",
  HOST_URL: "http://localhost:3000",
  IS_PRODUCTION: NODE_ENV === "production",
};
