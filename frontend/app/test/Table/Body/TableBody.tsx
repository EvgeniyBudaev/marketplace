import * as React from 'react';
import { flexRender } from '@tanstack/react-table';
import clsx from 'clsx';

import { THEME } from '../constants';
import type { TTableBodyProps, TTableRowOriginal } from './types';

export const TableBody = <TColumn extends object>({
  rows,
  theme,
  classes,
}: TTableBodyProps<TColumn>): React.ReactElement => {
  return (
    <tbody>
      {rows.map((row) => {
        const original = row.original as TTableRowOriginal;
        const isNew = original.isNew;
        return (
          <tr
            key={row.id}
            className={clsx(isNew ? THEME['new'].bodyRow : theme.bodyRow, classes?.bodyRow)}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={cell.id}
                  className={clsx(theme.bodyCell, classes?.bodyCell)}
                  style={{ width: cell.column.getSize(), maxWidth: cell.column.getSize() }}
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
