import { useEffect, useState } from "react";
import type { FC, MouseEvent, ReactElement, ReactNode } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useHydrated } from "remix-utils";
import clsx from "clsx";
import { getTooltipOffset } from "~/uikit/Tooltip/utils";
import type { TModifiers, TPlacement } from "./types";
import styles from "./Tooltip.module.css";

type TProps = {
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  isOpen?: boolean;
  message?: string | ReactElement | null;
  modifiers?: TModifiers;
  placement?: TPlacement;
  timerDelay?: number;
};

export const Tooltip: FC<TProps> = ({
  children,
  dataTestId,
  isOpen,
  message,
  modifiers,
  className = "",
  placement = "top",
  timerDelay = 100,
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const isManualVisibility = typeof isOpen !== "undefined";
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

  let popperModifiers: TModifiers = [
    {
      name: "arrow",
      options: {
        element: arrowElement,
        padding: 12,
      },
    },
    {
      name: "offset",
      options: {
        offset: getTooltipOffset({ placement, referenceElement }),
      },
    },
    {
      name: "preventOverflow",
      options: {
        altBoundary: true,
      },
    },
  ];

  if (modifiers) {
    popperModifiers = popperModifiers.concat(modifiers);
  }

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: popperModifiers,
    placement,
  });

  if (modifiers) {
    popperModifiers = popperModifiers.concat(modifiers);
  }

  useEffect(() => {
    const listener = () => setVisible(false);
    document.addEventListener('scroll', listener);
    return () => document.removeEventListener('scroll', listener);
  }, []);

  const handleMouseOver = () => {
    if (!isManualVisibility) {
      setVisible(true);
      clearTimeout(timer);
    }
  };

  const handleMouseLeave = () => {
    const newTimer = setTimeout(() => setVisible(false), timerDelay);
    setTimer(newTimer);
  };

  const handleInnerClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const isHydrated = useHydrated();

  return (
    <div className="Tooltip-Wrapper" data-testid={dataTestId}>
      <div
        className={clsx("Tooltip", className)}
        data-testid="tooltip-ref-element"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        ref={setReferenceElement}
      >
        {children}
      </div>

      {isHydrated &&
        (visible || isOpen) &&
        message &&
        ReactDOM.createPortal(
            <div
                className="Tooltip-Element"
                onClick={handleInnerClick}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                ref={setPopperElement}
                style={{
                  ...styles.popper,
                }}
                {...attributes.popper}
            >
              <div
                  className="Tooltip-ElementInner"
              >
                {message}
                <div className="Tooltip-Arrow" ref={setArrowElement} style={styles.arrow} />
              </div>
            </div>,
          document.body,
        )}
    </div>
  );
};

export function tooltipLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
