import { useCallback } from "react";
import { useFetcher } from "@remix-run/react";
import { ERoutes } from "#app/enums";
import { useSettings } from "#app/hooks";
import { EFormMethods } from "#app/shared/form";
import type { ETheme } from "#app/uikit";
import { createPath } from "#app/utils";

export const useTheme = () => {
  const fetcher = useFetcher();
  const { settings } = useSettings();

  const handleChangeTheme = useCallback(
    (theme: ETheme) => {
      const path = createPath({
        route: ERoutes.ResourcesTheme,
      });

      fetcher.submit(
        { theme, uuid: settings.uuid },
        {
          action: path,
          method: EFormMethods.Patch,
        }
      );
    },
    [fetcher, settings.uuid]
  );

  return {
    onChangeTheme: handleChangeTheme,
    theme: settings.theme as ETheme,
  };
};
