import {
  loginParamsSchema,
  loginSchema,
  signupParamsSchema,
  signupSchema,
} from "~/shared/api/auth/schemas";
import { loginApi, signupApi } from "~/shared/api/auth/utils";
import { apiDomainFunction } from "~/utils";

export const login = apiDomainFunction(loginParamsSchema, loginSchema)(loginApi);

export const signup = apiDomainFunction(signupParamsSchema, signupSchema)(signupApi);
