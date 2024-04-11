import clsx from "clsx";
import { Popover as UiPopover, Transition } from "@headlessui/react";
import { Fragment, memo, useEffect } from "react";
import type { FC } from "react";

import type { TPopoverProps } from "#app/uikit/components/Popover/HeadlessPopover";
import { usePopover } from "#app/uikit/components/Table/TableHeaderItem/hooks";

const HeadlessPopoverContentComponent: FC<
  TPopoverProps & { open?: boolean; close?: () => void }
> = (props) => {
  const {
    children,
    classes,
    close,
    dataTestId = "uikit__headless-popover",
    trigger,
    placement = "left",
  } = props;

  const {
    attributes,
    setPopperElement,
    setReferenceElement,
    styles,
    triggerRef,
  } = usePopover();

  useEffect(() => {
    const listener = () => close?.();
    document.addEventListener("scroll", listener);
    return () => document.removeEventListener("scroll", listener);
  }, [close]);

  return (
    <>
      <UiPopover.Button
        className={clsx("HeadlessPopover-Button", classes?.referenceElement)}
        data-testid={`${dataTestId}__button`}
        ref={setReferenceElement}
      >
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
            `HeadlessPopover-Panel__${placement}`,
            classes?.popperElement
          )}
          data-testid={`${dataTestId}__content`}
          ref={setPopperElement}
          style={{
            ...styles.popper,
          }}
          {...attributes.popper}
          onClick={close}
        >
          <div
            className={clsx(
              "HeadlessPopover-PanelContent",
              classes?.popperContent
            )}
          >
            {children}
          </div>
        </UiPopover.Panel>
      </Transition>
    </>
  );
};

export const HeadlessPopoverContent = memo(
  HeadlessPopoverContentComponent
) as typeof HeadlessPopoverContentComponent;
