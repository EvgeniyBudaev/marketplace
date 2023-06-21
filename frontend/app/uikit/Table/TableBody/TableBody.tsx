import {forwardRef} from "react";
import type {ForwardedRef} from "react";
import {flexRender} from "@tanstack/react-table";
import type {Row} from "@tanstack/react-table";
import {DEFAULT_COLUMN_MIN_SIZE} from "~/uikit/Table/constants";
import styles from "./TableBody.module.css";

type TProps<TColumn extends object> = {
  rows: Row<TColumn>[];
};

const TableBodyComponent = <T extends object>(
  {rows}: TProps<T>,
  ref: ForwardedRef<HTMLTableSectionElement>,
) => {
  return (
    <tbody className="TableBody-TBody" ref={ref}>
    {rows.map((row) => {
      return (
        <tr className="TableBody-TR" key={row.id}>
          {row.getVisibleCells().map((cell) => {
            return (
              <td
                className="TableBody-TD"
                key={cell.id}
                style={{
                  minWidth: cell.column.columnDef?.minSize ?? DEFAULT_COLUMN_MIN_SIZE,
                  maxWidth: cell.column.columnDef?.maxSize,
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      );
    })}
    </tbody>
  );
};

export const TableBody = forwardRef(TableBodyComponent);

export function tableBodyLinks() {
  return [{rel: "stylesheet", href: styles}];
}
