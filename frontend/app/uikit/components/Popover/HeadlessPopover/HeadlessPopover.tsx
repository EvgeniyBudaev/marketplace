import {createRef, Fragment, memo, useEffect, useState} from "react";
import type {FC} from "react";
import {Popover as UiPopover, Transition} from "@headlessui/react";
import clsx from "clsx";
import {POPOVER_POSITION_STYLES, POPOVER_WIDTH} from "~/uikit/components/Popover/HeadlessPopover/index";
import type {TPopoverPosition, TPopoverProps} from "~/uikit/components/Popover/HeadlessPopover/index";
import styles from "./HeadlessPopover.css";

const PopoverComponent: FC<TPopoverProps> = ({children, trigger, position = "center"}) => {
  const [popoverPosition, setPopoverPosition] = useState<TPopoverPosition>(position);
  const triggerRef = createRef<HTMLDivElement>();

  useEffect(
    () => {
      if (triggerRef.current && !position) {
        const {right, width} = triggerRef.current.getBoundingClientRect();
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

  return (
    <UiPopover className="HeadlessPopover">
      <UiPopover.Button className="HeadlessPopover-Button">
        <div ref={triggerRef}>{trigger}</div>
      </UiPopover.Button>
      <Transition
        as={Fragment}
        enter="HeadlessPopover-Transition__enter"
        enterFrom="HeadlessPopover-Transition__enterFrom"
        enterTo="HeadlessPopover-Transition__enterTo"
        leave="HeadlessPopover-Transition__leave"
        leaveFrom="HeadlessPopover-Transition__leaveFrom"
        leaveTo="HeadlessPopover-Transition__leaveTo"
      >
        <UiPopover.Panel
          className={clsx(
            "HeadlessPopover-Panel transform",
            `HeadlessPopover-Panel__${POPOVER_POSITION_STYLES[popoverPosition]}`,
          )}
        >
          <div className="HeadlessPopover-PanelContent">{children}</div>
        </UiPopover.Panel>
      </Transition>
    </UiPopover>
  );
};

export const HeadlessPopover = memo(PopoverComponent) as typeof PopoverComponent;

export function headlessPopoverLinks() {
  return [{rel: "stylesheet", href: styles}];
}
