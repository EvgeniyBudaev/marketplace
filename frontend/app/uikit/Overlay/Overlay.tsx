import { memo, useRef } from "react";
import type { FC, MouseEvent } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { TRANSITION } from "~/constants";
import styles from "./Overlay.css";

type TProps = {
  className?: string;
  isActive?: boolean;
  onClick?: (event: MouseEvent) => void;
  timeout?: number;
};

const OverlayComponent: FC<TProps> = ({
  className,
  isActive = false,
  onClick,
  timeout = TRANSITION,
}) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      className={clsx("Overlay", className)}
      in={isActive}
      nodeRef={nodeRef}
      onClick={onClick}
      timeout={timeout}
      unmountOnExit
    >
      <div ref={nodeRef} />
    </CSSTransition>
  );
};

export const Overlay = memo(OverlayComponent);

export function overlayLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
