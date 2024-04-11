import type { ReactElement } from "react";
import type { Row } from "@tanstack/react-table";
import {
  MoreActions,
  moreActionsLinks,
} from "#app/uikit/components/Table/MoreActions";
import {
  TableCell,
  tableCellLinks,
} from "#app/uikit/components/Table/TableCell";
import type { TTableRowActions } from "#app/uikit/components/Table/types";
import styles from "./TableRow.css";

type TTableRowProps<TColumn extends object> = {
  rowActions?: TTableRowActions<TColumn>;
  row: Row<TColumn>;
};

export const TableRow = <TColumn extends object>({
  rowActions,
  row,
}: TTableRowProps<TColumn>): ReactElement => {
  return (
    <tr className="TableRow" key={row.id}>
      {row.getVisibleCells().map((cell) => {
        return <TableCell cell={cell} key={cell.id} />;
      })}

      {!!rowActions?.length && (
        <MoreActions rowActions={rowActions} row={row} />
      )}
    </tr>
  );
};

export function tableRowLinks() {
  return [
    { rel: "stylesheet", href: styles },
    ...tableCellLinks(),
    ...moreActionsLinks(),
  ];
}
