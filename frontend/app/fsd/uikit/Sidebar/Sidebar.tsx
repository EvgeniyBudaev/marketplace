import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { Overlay } from "../Overlay";
import { TRANSITION } from "../../constants";

type TProps = {
  className?: string;
  children?: ReactNode;
  ref: ForwardedRef<HTMLDivElement>;
  transition?: number;
  isActive?: boolean;
  onClose?: (event: React.MouseEvent) => void;
};

export const Sidebar = forwardRef(
  (
    {
      className,
      children,
      transition = TRANSITION,
      isActive = false,
      onClose,
    }: TProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <>
        <Overlay timeout={transition} onClick={onClose} isActive={isActive} />
        <CSSTransition
          className={clsx("Sidebar", className)}
          in={isActive}
          nodeRef={ref}
          timeout={transition}
          unmountOnExit
        >
          <div ref={ref}>{children}</div>
        </CSSTransition>
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";
