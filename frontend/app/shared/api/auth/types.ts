import { z } from "zod";
import { loginParamsSchema, loginSchema } from "~/shared/api/auth/schemas";

export type TLoginParams = z.infer<typeof loginParamsSchema>;
export type TLogin = z.infer<typeof loginSchema>;
