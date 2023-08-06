import type { ReactElement } from "react";
import type { Row } from "@tanstack/react-table";

import { ETypographyVariant, HeadlessPopover, Icon, Typography } from "~/uikit";
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
  return (
    <td className="MoreActions">
      <HeadlessPopover
        dataTestId="table-cell__popover"
        trigger={
          <Icon
            className="MoreActions-Icon"
            dataTestId="table-cell__popover__more-vertical-icon"
            type="MoreVertical"
          />
        }
        placement="left"
      >
        <ul className="MoreActions-DropDownList">
          {rowActions.map(({ icon, title, onClick }) => {
            const handleItemClick = () => {
              onClick(row.original);
            };

            return (
              <li key={title} className="MoreActions-DropDownListItem">
                <div
                  className="MoreActions-DropDownListItem-Inner"
                  data-testid="table-cell__button"
                  onClick={handleItemClick}
                >
                  <div className="MoreActions-DropDownListItem-Icon">{icon}</div>

                  <Typography
                    dataTestId="table-cell__popover__button"
                    variant={ETypographyVariant.TextB3Regular}
                  >
                    {title}
                  </Typography>
                </div>
              </li>
            );
          })}
        </ul>
      </HeadlessPopover>
    </td>
  );
};

export function moreActionsLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
