import clsx from "clsx";
import { memo, useRef } from "react";
import type { FC, MouseEvent } from "react";
import { CSSTransition } from "react-transition-group";
import { TRANSITION } from "#app/constants";
import styles from "./Overlay.css";

type TProps = {
  className?: string;
  dataTestId?: string;
  isActive?: boolean;
  onClick?: (event: MouseEvent) => void;
  timeout?: number;
};

const OverlayComponent: FC<TProps> = ({
  className,
  dataTestId = "uikit__overlay",
  isActive = false,
  onClick,
  timeout = TRANSITION,
}) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      className={clsx("Overlay", className)}
      data-testid={dataTestId}
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
