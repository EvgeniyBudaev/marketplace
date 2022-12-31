import { userParamsSchema, userSchema } from "~/shared/api/users/schemas";
import { apiDomainFunction } from "~/utils";
import { getUserApi } from "./utils";

export const getUser = apiDomainFunction(userParamsSchema, userSchema)(getUserApi);
