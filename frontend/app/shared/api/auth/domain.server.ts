import { apiDomainFunction } from "~/utils";
import { loginParamsSchema, loginSchema } from "~/shared/api/auth/schemas";

export const login = apiDomainFunction(loginParamsSchema, loginSchema)(loginApi);
