import React, {memo, useRef} from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";

type TProps = {
  className?: string;
  timeout?: number;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

const OverlayComponent: React.FC<TProps> = ({
  className,
  timeout = 300,
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