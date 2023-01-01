import type { z } from "zod";
import type {
  loginParamsSchema,
  loginSchema,
  signupParamsSchema,
  signupSchema,
} from "~/shared/api/auth/schemas";

export type TLoginParams = z.infer<typeof loginParamsSchema>;
export type TLogin = z.infer<typeof loginSchema>;

export type TSignupParams = z.infer<typeof signupParamsSchema>;
export type TSignup = z.infer<typeof signupSchema>;
