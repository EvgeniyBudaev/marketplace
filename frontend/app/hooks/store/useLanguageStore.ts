import { useCallback } from "react";
import { useSettings } from "~/hooks";
import type { TSettings } from "~/shared/api/settings";
import type { ELanguages } from "~/uikit";

export const useLanguageStore = () => {
  const { settings, onChangeSettings } = useSettings();

  const handleSetStorageLanguage = useCallback(
    async (language: string) => {
      await onChangeSettings((prevState: TSettings) => ({
        ...prevState,
        language: language,
      }));
    },
    [onChangeSettings],
  );

  return {
    storageLanguage: settings.language as ELanguages,
    setStorageLanguage: handleSetStorageLanguage,
  };
};
