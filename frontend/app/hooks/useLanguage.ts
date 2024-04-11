import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher } from "@remix-run/react";
import dayjs from "dayjs";

import { ERoutes } from "#app/enums";
import { useLanguageStore, useSettings } from "#app/hooks";
import { ChangeLanguageContext } from "#app/shared/context";
import { EFormMethods } from "#app/shared/form";
import type { ELanguages } from "#app/uikit";
import { createPath } from "#app/utils";

type TUseLanguage = () => {
  isChangingLanguage: boolean;
  language: ELanguages;
  onChangeLanguage: (locale: ELanguages) => void;
};

export const useLanguage: TUseLanguage = () => {
  const fetcher = useFetcher();
  const { settings } = useSettings();
  const { i18n } = useTranslation();
  const [isChangingLanguage, setIsChangingLanguage] = useContext(
    ChangeLanguageContext
  );
  const { setStorageLanguage } = useLanguageStore();

  const handleChangeLanguage = useCallback(
    async (language: ELanguages) => {
      const path = createPath({
        route: ERoutes.ResourcesLanguage,
      });

      fetcher.submit(
        { language, uuid: settings.uuid },
        {
          action: path,
          method: EFormMethods.Patch,
        }
      );

      setIsChangingLanguage(true);
      dayjs.locale(language.toLowerCase());
      await i18n.changeLanguage(language.toLowerCase());
      await setStorageLanguage(language);
    },
    [fetcher, i18n, settings, setIsChangingLanguage, setStorageLanguage]
  );

  return {
    isChangingLanguage,
    language: settings.language as ELanguages,
    onChangeLanguage: handleChangeLanguage,
  };
};
