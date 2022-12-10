import { ForwardedRef, forwardRef, memo, ReactNode } from "react";
import type { MouseEvent } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { TRANSITION } from "~/constants";
import { Overlay } from "~/uikit";

type TProps = {
  className?: string;
  children?: ReactNode;
  ref: ForwardedRef<HTMLDivElement>;
  transition?: number;
  isActive?: boolean;
  onClose?: (event: MouseEvent) => void;
};

const SidebarComponent = forwardRef(
  (
    { className, children, transition = TRANSITION, isActive = false, onClose }: TProps,
    ref: ForwardedRef<HTMLDivElement>,
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
  },
);

SidebarComponent.displayName = "Sidebar";

export const Sidebar = memo(SidebarComponent);
