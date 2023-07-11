import type { z } from "zod";
import type {
  recipientSchema,
  recipientEditParamsSchema,
  recipientParamsSchema,
} from "~/shared/api/recipient";

export type TRecipient = z.infer<typeof recipientSchema>;
export type TRecipientParams = z.infer<typeof recipientParamsSchema>;
export type TRecipientEditParams = z.infer<typeof recipientEditParamsSchema>;
