import { userSettingsStore } from "~/process/store";
import { getSettingsSession } from "~/shared/api/settings";
import { EStoreKeys } from "~/shared/enums";
import type { ELanguages } from "~/uikit";

export const getStoreLanguage = async (request: Request, uuid: string): Promise<ELanguages> => {
  const settingsSession = await getSettingsSession(request);
  const settings = JSON.parse(settingsSession || "{}");
  // console.log("getStoreLanguage settings: ", settings);
  const userSettings = await userSettingsStore.getItem<ELanguages>(request, EStoreKeys.Language, uuid);
  // console.log("getStoreLanguage userSettings: ", userSettings);
  // return settings.language.toLowerCase();
  return userSettings.language.toLowerCase();
};
