import { memo, useRef } from "react";
import type { FC, MouseEvent } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { TRANSITION } from "~/constants";
import styles from "./Overlay.css";

type TProps = {
  className?: string;
  timeout?: number;
  isActive?: boolean;
  onClick?: (event: MouseEvent) => void;
};

const OverlayComponent: FC<TProps> = ({
  className,
  timeout = TRANSITION,
  isActive = false,
  onClick,
}) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      className={clsx("Overlay", className)}
      in={isActive}
      nodeRef={nodeRef}
      timeout={timeout}
      unmountOnExit
      onClick={onClick}
    >
      <div ref={nodeRef} />
    </CSSTransition>
  );
};

export const Overlay = memo(OverlayComponent);

export function overlayLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
