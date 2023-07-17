import clsx from "clsx";
import { Fragment } from "react";
import type { ReactElement } from "react";
import type { Row } from "@tanstack/react-table";
import { Popover as UiPopover, Transition } from "@headlessui/react";

import { Icon, POPOVER_POSITION_STYLES, Typography } from "~/uikit";
import { usePopover } from "~/uikit/components/Table/MoreActions/hooks";
import type { TTableRowActions } from "../types";
import styles from "./MoreActions.css";

type TProps<TColumn extends object> = {
  rowActions: TTableRowActions<TColumn>;
  row: Row<TColumn>;
};

export const MoreActions = <TColumn extends object>({
  rowActions,
  row,
}: TProps<TColumn>): ReactElement => {
  const { attributes, popoverPosition, setPopperElement, setReferenceElement, styles, triggerRef } =
    usePopover();

  const renderPopoverContent = (close: any) => {
    return (
      <ul className="MoreActions-DropDownList">
        {rowActions.map(({ icon, title, onClick }) => {
          const handleItemClick = () => {
            onClick(row.original);
            close?.();
          };

          return (
            <li key={title} className="MoreActions-DropDownListItem">
              <div
                className="MoreActions-DropDownListItem-Inner"
                data-testid="table-cell__button"
                onClick={handleItemClick}
              >
                <div className="MoreActions-DropDownListItem-Icon">{icon}</div>

                <Typography color="inherit" dataTestId="table-cell__popover__button">
                  {title}
                </Typography>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <td className="MoreActions group-hover:visible">
      <UiPopover className="HeadlessPopover">
        <UiPopover.Button ref={setReferenceElement} className="HeadlessPopover-Button">
          <div ref={triggerRef}>
            <Icon
              className="MoreActions-Icon"
              dataTestId="table-cell__popover__more-vertical-icon"
              type="MoreVertical"
            />
          </div>
        </UiPopover.Button>
        <Transition as={Fragment}>
          <UiPopover.Panel
            ref={setPopperElement}
            style={styles.popper}
            className={clsx(
              "HeadlessPopover-Panel",
              `HeadlessPopover-Panel__${POPOVER_POSITION_STYLES[popoverPosition]}`,
            )}
            {...attributes.popper}
          >
            {({ close }) => (
              <Transition.Child
                as={Fragment}
                enter="HeadlessPopover-Transition__enter"
                enterFrom="HeadlessPopover-Transition__enterFrom"
                enterTo="HeadlessPopover-Transition__enterTo"
                leave="HeadlessPopover-Transition__leave"
                leaveFrom="HeadlessPopover-Transition__leaveFrom"
                leaveTo="HeadlessPopover-Transition__leaveTo"
              >
                <div className="HeadlessPopover-PanelContent">{renderPopoverContent(close)}</div>
              </Transition.Child>
            )}
          </UiPopover.Panel>
        </Transition>
      </UiPopover>
    </td>
  );
};

export function moreActionsLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
