import type { ReactElement } from "react";
import type { Cell } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { DEFAULT_COLUMN_MIN_SIZE } from "../constants";
import styles from "./TableCell.css";

type TTableCellProps<TColumn extends object> = {
  cell: Cell<TColumn, unknown>;
};

export const TableCell = <TColumn extends object>({
  cell,
}: TTableCellProps<TColumn>): ReactElement => {
  return (
    <td
      className="TableCell"
      key={cell.id}
      style={{
        minWidth: cell.column.columnDef?.minSize ?? DEFAULT_COLUMN_MIN_SIZE,
        maxWidth: cell.column.columnDef?.maxSize,
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

export function tableCellLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
