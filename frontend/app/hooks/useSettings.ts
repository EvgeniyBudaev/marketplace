import { useCallback } from "react";
import { useStoreContext } from "~/shared/store";

export const useSettings = () => {
  const { settings, setSettings } = useStoreContext();

  const onChangeSettings = useCallback(
    async (value: any) => {
      await setSettings(value);
    },
    [setSettings],
  );

  return { settings, onChangeSettings };
};
