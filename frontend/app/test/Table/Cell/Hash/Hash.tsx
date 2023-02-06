import * as React from 'react';
import type { TTableCellHashProps } from './types';

const TableCellHashComponent: React.FC<TTableCellHashProps> = ({ value }) => {
  return (
    <div className="flex flex-nowrap gap-x-0.5">
      <div>{value.slice(0, 4)}</div>
      <div className="text-primary relative -top-1">....</div>
      <div>{value.slice(-4)}</div>
    </div>
  );
};

export const TableCellHash = React.memo(TableCellHashComponent);
