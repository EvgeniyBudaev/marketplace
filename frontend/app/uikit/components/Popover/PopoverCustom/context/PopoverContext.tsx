import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

const initialPopoverState = {
  isOpen: false,
  onClose: (): void => {},
  onToggle: (): void => {},
};

const PopoverContext = createContext(initialPopoverState);

type PopoverContextProps = {
  children?: ReactNode;
};

export const usePopover = () => {
  return useContext(PopoverContext);
};

export const PopoverProvider = ({ children }: PopoverContextProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <PopoverContext.Provider
      value={{ isOpen, onClose: handleClose, onToggle: handleToggle }}
    >
      {children}
    </PopoverContext.Provider>
  );
};
