import clsx from "clsx";
import { memo } from "react";
import type { FC } from "react";
import { Popover as UiPopover } from "@headlessui/react";
import type { TPopoverProps } from "~/uikit/components/Popover/HeadlessPopover";
import { HeadlessPopoverContent } from "~/uikit/components/Popover/HeadlessPopover/HeadlessPopoverContent";
import styles from "./HeadlessPopover.css";

const PopoverComponent: FC<TPopoverProps> = (props) => {
  const { className, dataTestId = "uikit__headless-popover", ...rest } = props;
  return (
    <UiPopover className={clsx("HeadlessPopover", className)} data-testid={dataTestId}>
      {({ open, close }) => <HeadlessPopoverContent {...rest} open={open} close={close} />}
    </UiPopover>
  );
};

export const HeadlessPopover = memo(PopoverComponent) as typeof PopoverComponent;

export function headlessPopoverLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
