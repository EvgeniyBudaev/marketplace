import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type TUseScrollToTableParams = {
  content: Array<unknown>;
  ref: RefObject<HTMLDivElement>;
};

export const useScrollToTable = ({
  content,
  ref,
}: TUseScrollToTableParams): void => {
  const isInitialized = useRef<boolean>();

  useEffect(() => {
    if (isInitialized.current && content?.length && ref.current) {
      ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }

    if (!isInitialized.current) {
      isInitialized.current = true;
    }
  }, [content, ref, isInitialized]);
};
