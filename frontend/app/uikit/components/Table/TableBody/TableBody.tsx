import { forwardRef } from "react";
import type { ForwardedRef } from "react";
import type { Row } from "@tanstack/react-table";
import { TableRow, tableRowLinks } from "#app/uikit/components/Table/TableRow";
import type { TTableRowActions } from "#app/uikit/components/Table/types";
import styles from "./TableBody.css";

type TProps<TColumn extends object> = {
  rowActions?: TTableRowActions<TColumn>;
  rows: Row<TColumn>[];
};

const TableBodyComponent = <T extends object>(
  { rowActions, rows }: TProps<T>,
  ref: ForwardedRef<HTMLTableSectionElement>
) => {
  return (
    <tbody className="TableBody" ref={ref}>
      {rows.map((row) => {
        return <TableRow key={row.id} rowActions={rowActions} row={row} />;
      })}
    </tbody>
  );
};

export const TableBody = forwardRef(TableBodyComponent);

export function tableBodyLinks() {
  return [{ rel: "stylesheet", href: styles }, ...tableRowLinks()];
}
