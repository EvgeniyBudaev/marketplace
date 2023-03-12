import {
  settingsParamsSchema,
  settingsSchema,
  themeParamsSchema,
  themeSchema,
} from "~/shared/api/settings/schemas";
import { getSettingsApi, updateThemeApi } from "~/shared/api/settings/utils";
import { apiDomainFunction } from "~/utils";

export const getSettings = apiDomainFunction(settingsParamsSchema, settingsSchema)(getSettingsApi);

export const updateTheme = apiDomainFunction(themeParamsSchema, themeSchema)(updateThemeApi);
