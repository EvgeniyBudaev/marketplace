import { forwardRef} from "react";
import type {ForwardedRef} from "react";
import { flexRender } from "@tanstack/react-table";
import type { Row } from "@tanstack/react-table";
import styles from "./TableBody.module.css";

type TProps<TColumn extends object> = {
  rows: Row<TColumn>[];
};

const TableBodyComponent = <T extends object>({ rows }: TProps<T>, ref: ForwardedRef<HTMLTableSectionElement>,) => {
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
                    width: cell.column.getSize(),
                    minWidth: cell.column.getSize(),
                    maxWidth: cell.column.getSize(),
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
  return [{ rel: "stylesheet", href: styles }];
}
