import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher } from "@remix-run/react";
import dayjs from "dayjs";

import { ERoutes } from "~/enums";
import { useLanguageStore, useSettings } from "~/hooks";
import { ChangeLanguageContext } from "~/shared/context";
import { EFormMethods } from "~/shared/form";
import type { ELanguages } from "~/uikit";
import { createPath } from "~/utils";

type TUseLanguage = () => {
  isChangingLanguage: boolean;
  language: ELanguages;
  onChangeLanguage: (locale: ELanguages) => void;
};

export const useLanguage: TUseLanguage = () => {
  const fetcher = useFetcher();
  const { settings } = useSettings();
  const { i18n } = useTranslation();
  const [isChangingLanguage, setIsChangingLanguage] = useContext(ChangeLanguageContext);
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
        },
      );

      setIsChangingLanguage(true);
      dayjs.locale(language.toLowerCase());
      await i18n.changeLanguage(language.toLowerCase());
      await setStorageLanguage(language);
    },
    [fetcher, i18n, settings, setIsChangingLanguage, setStorageLanguage],
  );

  return {
    isChangingLanguage,
    language: settings.language as ELanguages,
    onChangeLanguage: handleChangeLanguage,
  };
};
