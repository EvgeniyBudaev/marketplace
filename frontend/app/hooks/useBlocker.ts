import type { BrowserHistory, Blocker, Transition } from "history";
import { useContext, useEffect, useState } from "react";
import { UNSAFE_NavigationContext } from "react-router";

/**
 * !!!Основано на небезопасных апи. Может сломаться в любой момент
 * @param blocker
 * @param when
 * @returns
 */
export const useBlocker = (blocker: Blocker, when = true) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator as BrowserHistory;
  const [tx, setTx] = useState<null | Transition>(null);

  useEffect(() => {
    if (!when || !("block" in navigator)) {
      setTx(null);
      return;
    }

    const unblock = navigator.block((tx) => {
      const modifiedTx = {
        ...tx,
        retry: () => {
          unblock();
          tx.retry();
        },
      };
      setTx(modifiedTx);
      blocker(modifiedTx);
    });

    return unblock;
  }, [blocker, navigator, when]);

  return tx;
};
