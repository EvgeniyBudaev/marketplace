import { useCallback } from "react";
import { useStoreContext } from "~/shared/store";

export const useChangeUser = () => {
  const { user, setUser } = useStoreContext();

  const onChangeUser = useCallback(
    async (value: any) => {
      await setUser(value);
    },
    [setUser],
  );

  return { user, onChangeUser };
};
