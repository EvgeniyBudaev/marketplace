import type { z } from "zod";
import type {
  languageParamsSchema,
  languageSchema,
  settingsParamsSchema,
  settingsSchema,
  themeParamsSchema,
  themeSchema,
} from "~/shared/api/settings";
export type TSettingsParams = z.infer<typeof settingsParamsSchema>;
export type TSettings = z.infer<typeof settingsSchema>;

export type TThemeParams = z.infer<typeof themeParamsSchema>;
export type TTheme = z.infer<typeof themeSchema>;

export type TLanguageParams = z.infer<typeof languageParamsSchema>;
export type TLanguage = z.infer<typeof languageSchema>;
