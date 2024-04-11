import { useCallback } from "react";
import type { Context, SetStateAction } from "react";
import { useStoreContext } from "#app/shared/store";
import type { TUser } from "#app/shared/api/users/types";

export const useUser = () => {
  const { user, setUser } = useStoreContext();

  const onChangeUser = useCallback(
    async (value: any) => {
      await setUser(value);
    },
    [setUser]
  );

  return { user, onChangeUser };
};
