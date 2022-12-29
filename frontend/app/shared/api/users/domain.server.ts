import { apiDomainFunction } from "~/utils";
import { userParamsSchema, userSchema } from "~/shared/api/users/schemas";
import { getUserApi } from "./utils";

export const getUser = apiDomainFunction(userParamsSchema, userSchema)(getUserApi);
