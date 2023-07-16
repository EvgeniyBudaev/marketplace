import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {DropDownContext} from "~/uikit/context";
import type {TDropDownState} from "~/uikit/context";

export const useDropDownContext = (): TDropDownState | null => {
  return useContext(DropDownContext);
};

type TUseDropDown = () => TDropDownState;

export const useDropDown: TUseDropDown = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const refButtonDropDown = useRef<HTMLDivElement>(null);
  const refPanelDropDown = useRef<HTMLDivElement>(null);

  const handleChangeDropDownOpen = useCallback((isOpen: boolean) => {
    setIsDropDownOpen(isOpen);
  }, []);

  const handleClickButtonDropDown = useCallback(() => {
    setIsDropDownOpen((prevState?: boolean) => !prevState);
  }, []);

  const handleClickOutsideDropDown = (event: MouseEvent) => {
    if (
      isDropDownOpen &&
      refButtonDropDown.current &&
      event.target instanceof HTMLElement &&
      !refButtonDropDown.current.contains(event.target)
    ) {
      if (refPanelDropDown.current && !refPanelDropDown.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    }
  };

  const handleScroll = useCallback(() => {
    setIsDropDownOpen(false);
  }, []);


  useEffect(() => {
    window.addEventListener("click", handleClickOutsideDropDown);
    return () => {
      window.removeEventListener("click", handleClickOutsideDropDown);
    };
  });

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return useMemo(() => {
    return {
      isDropDownOpen,
      onClickButtonDropDown: handleClickButtonDropDown,
      refButtonDropDown,
      refPanelDropDown,
    };
  }, [isDropDownOpen, handleChangeDropDownOpen, handleClickButtonDropDown]);
};