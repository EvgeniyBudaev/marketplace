import {
  languageParamsSchema,
  languageSchema,
  settingsParamsSchema,
  settingsSchema,
  themeParamsSchema,
  themeSchema,
} from "~/shared/api/settings/schemas";
import { getSettingsApi, updateLanguageApi, updateThemeApi } from "~/shared/api/settings/utils";
import { apiDomainFunction } from "~/utils";

export const getSettings = apiDomainFunction(settingsParamsSchema, settingsSchema)(getSettingsApi);

export const updateTheme = apiDomainFunction(themeParamsSchema, themeSchema)(updateThemeApi);

export const updateLanguage = apiDomainFunction(
  languageParamsSchema,
  languageSchema,
)(updateLanguageApi);
