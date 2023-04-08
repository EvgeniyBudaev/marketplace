import { useCallback } from "react";
import { useFetcher } from "@remix-run/react";
import { ERoutes } from "~/enums";
import { useSettings } from "~/hooks";
import { EFormMethods } from "~/shared/form";
import type { ETheme } from "~/uikit";
import { createPath } from "~/utils";

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
        },
      );
    },
    [fetcher, settings],
  );

  return {
    onChangeTheme: handleChangeTheme,
    theme: settings.theme as ETheme,
  };
};
