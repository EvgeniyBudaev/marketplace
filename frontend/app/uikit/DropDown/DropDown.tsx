import { memo, useRef } from "react";
import type { FC, ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import { TRANSITION } from "~/constants";
import styles from "./DropDown.module.css";

type TProps = {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
};

const DropDownComponent: FC<TProps> = ({ className, children, isOpen }: TProps) => {
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
        <div className="DropDown">{children}</div>
      </div>
    </CSSTransition>
  );
};

export const DropDown = memo(DropDownComponent);

export function dropDownLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
