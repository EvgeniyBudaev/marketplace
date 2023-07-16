import type { ReactElement } from "react";
import type { Row } from "@tanstack/react-table";

import { HeadlessPopover as UiPopover, Icon, Typography } from "~/uikit";
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
    <td className="MoreActions group-hover:visible">
      <UiPopover
        dataTestId="table-cell__popover"
        trigger={
          <Icon
            className="MoreActions-Icon text-dark hover:text-primary"
            dataTestId="table-cell__popover__more-vertical-icon"
            type="MoreVertical"
          />
        }
        // placement="bottom"
        position="left"
      >
        <ul className="MoreActions-List">
          {rowActions.map(({ icon, title, onClick }) => {
            return (
              <li key={title} className="MoreActions-ListItem">
                <div
                  className="hover:text-primary flex cursor-pointer gap-2"
                  data-testid="table-cell__button"
                  onClick={() => {
                    onClick(row.original);
                  }}
                >
                  {icon}

                  <Typography color="inherit" dataTestId="table-cell__popover__button">
                    {title}
                  </Typography>
                </div>
              </li>
            );
          })}
        </ul>
      </UiPopover>
    </td>
  );
};

export function moreActionsLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
