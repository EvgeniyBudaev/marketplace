import {
  userDetailsParamsSchema,
  userParamsSchema,
  userSchema,
} from "#app/shared/api/users/schemas";
import { apiDomainFunction } from "#app/utils";
import { getUserApi, getUserDetailsApi } from "./utils";

export const getUser = apiDomainFunction(
  userParamsSchema,
  userSchema
)(getUserApi);
export const getUserDetails = apiDomainFunction(
  userDetailsParamsSchema,
  userSchema
)(getUserDetailsApi);
