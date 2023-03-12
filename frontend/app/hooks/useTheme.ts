import { useCallback, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { ERoutes } from "~/enums";
import type { ETheme } from "~/enums";
import { useSettings, useUser } from "~/hooks";
import { EFormMethods } from "~/shared/form";
import { createPath } from "~/utils";

export const useTheme = () => {
  const fetcher = useFetcher();
  const { settings, onChangeSettings } = useSettings();
  const { user, onChangeUser } = useUser();
  const [theme, setTheme] = useState("LIGHT");
  console.log("useTheme settings:  ", settings);

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
    [fetcher, settings.uuid],
  );

  return {
    onChangeTheme: handleChangeTheme,
    theme: settings.theme,
  };
};
