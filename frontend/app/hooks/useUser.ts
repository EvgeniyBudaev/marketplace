import { useCallback } from "react";
import type { Context, SetStateAction } from "react";
import { useStoreContext } from "~/shared/store";
import type { TUser } from "~/shared/api/users/types";

export const useUser = () => {
  const { user, setUser } = useStoreContext();

  const onChangeUser = useCallback(
    async (value: any) => {
      await setUser(value);
    },
    [setUser],
  );

  return { user, onChangeUser };
};
