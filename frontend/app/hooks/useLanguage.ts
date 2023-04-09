import { useCallback } from "react";
import { useFetcher } from "@remix-run/react";
import { ERoutes } from "~/enums";
import { useSettings } from "~/hooks";
import { EFormMethods } from "~/shared/form";
import type { ELanguages } from "~/uikit";
import { createPath } from "~/utils";

export const useLanguage = () => {
  const fetcher = useFetcher();
  const { settings } = useSettings();

  const handleChangeLanguage = useCallback(
    (language: ELanguages) => {
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
    },
    [fetcher, settings],
  );

  return {
    onChangeLanguage: handleChangeLanguage,
    language: settings.language as ELanguages,
  };
};
