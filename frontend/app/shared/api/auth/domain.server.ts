import { loginParamsSchema, loginSchema } from "~/shared/api/auth/schemas";
import { loginApi } from "~/shared/api/auth/utils";
import { apiDomainFunction } from "~/utils";

export const login = apiDomainFunction(loginParamsSchema, loginSchema)(loginApi);
