import { settingsParamsSchema, settingsSchema } from "~/shared/api/settings/schemas";
import { getSettingsApi } from "~/shared/api/settings/utils";
import { apiDomainFunction } from "~/utils";

export const getSettings = apiDomainFunction(settingsParamsSchema, settingsSchema)(getSettingsApi);
