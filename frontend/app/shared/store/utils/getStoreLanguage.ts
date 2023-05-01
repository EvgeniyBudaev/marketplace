import { getSettingsSession } from "~/shared/api/settings";
import type { ELanguages } from "~/uikit";

export const getStoreLanguage = async (request: Request): Promise<ELanguages> => {
  const settingsSession = await getSettingsSession(request);
  const settings = JSON.parse(settingsSession || "{}");
  console.log("getStoreLanguage settings: ", settings);
  return settings.language.toLowerCase();
};
