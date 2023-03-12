import type { z } from "zod";
import type {
  settingsParamsSchema,
  settingsSchema,
  themeParamsSchema,
  themeSchema,
} from "~/shared/api/settings";

export type TSettingsParams = z.infer<typeof settingsParamsSchema>;
export type TSettings = z.infer<typeof settingsSchema>;

export type TThemeParams = z.infer<typeof themeParamsSchema>;
export type TTheme = z.infer<typeof themeSchema>;
