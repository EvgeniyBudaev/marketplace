import { createRef, useEffect, useState } from "react";
import { usePopper as usePopperUI } from "react-popper";
import { POPOVER_WIDTH } from "~/uikit";
import type { TPopoverPosition } from "~/uikit";

export const usePopover = () => {
  const position = "left";
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const [popoverPosition, setPopoverPosition] = useState<TPopoverPosition>(position);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
  const triggerRef = createRef<HTMLDivElement>();

  const { styles, attributes } = usePopperUI(referenceElement, popperElement, {
    modifiers: [
      {
        name: "flip",
        options: {
          altBoundary: true,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 12],
        },
      },
      {
        name: "preventOverflow",
        options: {
          altBoundary: true,
          padding: 12,
        },
      },
    ],
  });

  useEffect(
    () => {
      if (triggerRef.current && !position) {
        const { right, width } = triggerRef.current.getBoundingClientRect();
        const bodyWidth = document.body.clientWidth;
        const centerWidth = POPOVER_WIDTH / 2;
        const triggerCenter = right - width / 2;
        const rightSize = bodyWidth - triggerCenter;
        const isRight = rightSize < centerWidth;
        const isLeft = centerWidth > triggerCenter;

        if (isRight) {
          setPopoverPosition("right");
        }

        if (isLeft) {
          setPopoverPosition("left");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { attributes, popoverPosition, setPopperElement, setReferenceElement, styles, triggerRef };
};
