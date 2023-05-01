import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher } from "@remix-run/react";
import dayjs from "dayjs";
import { ERoutes } from "~/enums";
import { useSettings } from "~/hooks";
import { EFormMethods } from "~/shared/form";
import type { ELanguages } from "~/uikit";
import { createPath } from "~/utils";

export const useLanguage = () => {
  const fetcher = useFetcher();
  const { settings } = useSettings();
  const { i18n } = useTranslation();

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

      dayjs.locale(language.toLowerCase());
      await i18n.changeLanguage(language.toLowerCase());
    },
    [fetcher, i18n, settings],
  );

  return {
    onChangeLanguage: handleChangeLanguage,
    language: settings.language as ELanguages,
  };
};
