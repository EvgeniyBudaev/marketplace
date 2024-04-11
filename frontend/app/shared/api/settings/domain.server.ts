import {
  languageParamsSchema,
  languageSchema,
  settingsParamsSchema,
  settingsSchema,
  themeParamsSchema,
  themeSchema,
} from "#app/shared/api/settings/schemas";
import {
  getSettingsApi,
  updateLanguageApi,
  updateThemeApi,
} from "#app/shared/api/settings/utils";
import { apiDomainFunction } from "#app/utils";

export const getSettings = apiDomainFunction(
  settingsParamsSchema,
  settingsSchema
)(getSettingsApi);

export const updateTheme = apiDomainFunction(
  themeParamsSchema,
  themeSchema
)(updateThemeApi);

export const updateLanguage = apiDomainFunction(
  languageParamsSchema,
  languageSchema
)(updateLanguageApi);
