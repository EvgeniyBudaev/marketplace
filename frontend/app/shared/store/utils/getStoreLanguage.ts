import { DEFAULT_LANGUAGE } from "#app/constants";
import { userSettingsStore } from "#app/process/store";
import { EStoreKeys } from "#app/shared/enums";
import type { ELanguages } from "#app/uikit";

type TProps = {
  request: Request;
  uuid?: string;
};

type TGetStoreLanguage = (props: TProps) => Promise<ELanguages>;

export const getStoreLanguage: TGetStoreLanguage = async ({
  request,
  uuid,
}) => {
  const userSettings = await userSettingsStore.getItem<ELanguages>(
    request,
    EStoreKeys.Language,
    uuid
  );

  return userSettings.language?.toLowerCase() ?? DEFAULT_LANGUAGE;
};
