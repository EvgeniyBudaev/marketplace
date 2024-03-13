import type { z } from "zod";
import type {
  userParamsSchema,
  userDetailsParamsSchema,
  userSchema,
} from "~/shared/api/users/schemas";

export type TUserParams = z.infer<typeof userParamsSchema>;
export type TUser = z.infer<typeof userSchema>;

export type TUserDetailsParams = z.infer<typeof userDetailsParamsSchema>;
