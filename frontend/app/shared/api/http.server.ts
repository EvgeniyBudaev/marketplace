import { createApi } from "~/utils";
import { Environment } from "~/environment.server";

export const { fetchApi } = createApi({
  basePath: Environment.API_URL,
  timeout: 50_000,
  retry: 1,
});
