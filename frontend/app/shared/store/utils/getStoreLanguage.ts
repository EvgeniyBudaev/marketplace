import { userSettingsStore } from "~/process/store";
import { EStoreKeys } from "~/shared/enums";
import type { ELanguages } from "~/uikit";

type TProps = {
  request: Request;
  uuid?: string;
};

type TGetStoreLanguage = (props: TProps) => Promise<ELanguages>;

export const getStoreLanguage: TGetStoreLanguage = async ({request, uuid}) => {
  const userSettings = await userSettingsStore.getItem<ELanguages>(request, EStoreKeys.Language, uuid);
  return userSettings.language.toLowerCase();
};
