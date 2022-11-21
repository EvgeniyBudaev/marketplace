import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { TRANSITION } from "../../constants";
import classes from "./DropDown.module.scss";

type TProps = {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
};

export const DropDown: React.FC<TProps> = ({
  className,
  children,
  isOpen,
}: TProps) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      className={className}
      in={isOpen}
      nodeRef={nodeRef}
      timeout={TRANSITION}
      unmountOnExit
    >
      <div ref={nodeRef}>
        <div className={clsx(classes.DropDown)}>{children}</div>
      </div>
    </CSSTransition>
  );
};
