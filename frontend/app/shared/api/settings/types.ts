import type { z } from "zod";
import { settingsParamsSchema, settingsSchema } from "~/shared/api/settings";

export type TSettingsParams = z.infer<typeof settingsParamsSchema>;
export type TSettings = z.infer<typeof settingsSchema>;
