import {
  loginParamsSchema,
  loginSchema,
  refreshTokenParamsSchema,
  refreshTokenSchema,
  signupParamsSchema,
  signupSchema,
} from "#app/shared/api/auth/schemas";
import {
  loginApi,
  refreshTokenApi,
  signupApi,
} from "#app/shared/api/auth/utils";
import { apiDomainFunction } from "#app/utils";

export const login = apiDomainFunction(
  loginParamsSchema,
  loginSchema
)(loginApi);

export const signup = apiDomainFunction(
  signupParamsSchema,
  signupSchema
)(signupApi);

export const refreshToken = apiDomainFunction(
  refreshTokenParamsSchema,
  refreshTokenSchema
)(refreshTokenApi);
