import { useCallback, useEffect, useRef, useState } from "react";
import type { FC, ReactElement, ReactNode } from "react";
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
};

export const Tooltip: FC<TProps> = ({
  children,
  dataTestId,
  isOpen,
  message,
  modifiers,
  className = "",
  placement = "top",
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const isManualVisibility = typeof isOpen !== "undefined";

  let popperModifiers: TModifiers = [
    {
      name: "arrow",
      options: {
        element: arrowElement,
        padding:
          popperElement &&
          referenceElement &&
          popperElement.offsetWidth / referenceElement.offsetWidth,
      },
    },
    {
      name: "flip",
      options: {
        altBoundary: true,
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

  const closeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onToggle = useCallback(
    (visible: boolean | ((prevState: boolean) => boolean)) => () => {
      if (!isManualVisibility) {
        clearTimeout(closeTimeout.current);

        if (visible) {
          setVisible(true);
        } else {
          closeTimeout.current = setTimeout(() => setVisible(false), 1000);
        }
      }
    },
    [isManualVisibility],
  );

  useEffect(() => {
    const listener = () => setVisible(false);

    document.addEventListener("scroll", listener);

    return () => document.removeEventListener("scroll", listener);
  }, [onToggle]);

  useEffect(() => {
    const listener = (event: Event) => {
      if (!popperElement?.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener);
  });

  const isHydrated = useHydrated();

  return (
    <div className="Tooltip-Wrapper" data-testid={dataTestId}>
      <div
        className={clsx("Tooltip", className)}
        data-testid="tooltip-ref-element"
        onMouseOver={onToggle(true)}
        onMouseOut={onToggle(false)}
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
            ref={setPopperElement}
            style={{
              ...styles.popper,
            }}
            {...attributes.popper}
            onMouseOver={onToggle(true)}
            onMouseOut={onToggle(false)}
          >
            {message}
            <div className="Tooltip-Arrow" ref={setArrowElement} style={styles.arrow} />
          </div>,
          document.body,
        )}
    </div>
  );
};

export function tooltipLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
