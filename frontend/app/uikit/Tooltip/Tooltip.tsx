import { useState } from "react";
import type { FC, ReactElement, ReactNode } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useHydrated } from "remix-utils";
import clsx from "clsx";
import type { TModifiers, TPlacement } from "./types";
import styles from "./Tooltip.module.css";

type TProps = {
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  message?: string | ReactElement;
  modifiers?: TModifiers;
  placement?: TPlacement;
};

export const Tooltip: FC<TProps> = ({
  children,
  dataTestId,
  message,
  modifiers,
  className = "",
  placement = "right",
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  let popperModifiers: TModifiers = [
    {
      name: "arrow",
      options: { element: arrowElement },
    },
    {
      name: "preventOverflow",
      options: {
        altBoundary: true,
      },
    },
    {
      name: "flip",
      options: {
        altBoundary: true,
        allowedAutoPlacements: ["top", "left"],
        fallbackPlacements: ["top", "left"],
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

  const onToggle = (visible: boolean | ((prevState: boolean) => boolean)) => () =>
    setVisible(visible);

  const isHydrated = useHydrated();

  return (
    <div data-testid={dataTestId}>
      <div
        className={clsx("Tooltip", className)}
        data-testid="tooltip-ref-element"
        onMouseOver={onToggle(true)}
        onMouseOut={onToggle(false)}
        ref={setReferenceElement}
      >
        {children}
      </div>

      {isHydrated && visible && message && (
        //   ReactDOM.createPortal(
        //     <div
        //       className="Tooltip-Main"
        //       ref={setPopperElement}
        //       style={styles.popper}
        //       {...attributes.popper}
        //     >
        //       {message}
        //       <div className="Tooltip-Arrow" ref={setArrowElement} style={styles.arrow} />
        //     </div>,
        //     document.body,
        //   )

        <div
          className="Tooltip-Main"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {message}
          <div className="Tooltip-Arrow" ref={setArrowElement} style={styles.arrow} />
        </div>
      )}
    </div>
  );
};

export function tooltipLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
