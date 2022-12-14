import invariant from "tiny-invariant";

export type EnvironmentType = {
  API_URL: string;
  IS_PRODUCTION: boolean;
};

const { API_URL, NODE_ENV } = process.env;

invariant(API_URL, "API_URL must be set in env file");

/**
 * Переменные окружения
 */
export const Environment: EnvironmentType = {
  API_URL: API_URL,
  IS_PRODUCTION: NODE_ENV === "production",
};
