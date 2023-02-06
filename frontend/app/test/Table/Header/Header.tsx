import * as React from 'react';
import { flexRender } from '@tanstack/react-table';
import clsx from 'clsx';

import type { THeaderTableProps, TSortingColumnStateWithReset } from './types';
import { getInitialSortingColumnState } from '~/components/Table/Header/utils';
import { SortingIndicator } from '~/components/Table/Header/SortingIndicator';

export const TableHeader = <T extends object>({
  headerGroups,
  theme,
  sorting,
  classes,
}: THeaderTableProps<T>): React.ReactElement => {
  const [sortingState, setSortingState] = React.useState<
    TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null
  >(getInitialSortingColumnState(sorting));

  const handleChangeSorting = (
    value: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null,
  ) => {
    if (!value) {
      setSortingState(null);
      sorting?.onChangeSorting();
      return;
    }

    if (Array.isArray(value) && sorting?.multiple) {
      setSortingState(value);
      sorting?.onChangeSorting(
        value.map((item) => ({
          sortProperty: item.sortProperty,
          sortDirection: item.sortDirection,
        })),
      );
      return;
    }

    const { sortDirection, sortProperty } = value as TSortingColumnStateWithReset;
    setSortingState(value as TSortingColumnStateWithReset);
    sorting?.onChangeSorting({
      sortProperty,
      sortDirection,
    });
  };

  return (
    <thead>
      {headerGroups.map((headerGroup) => {
        return (
          <tr key={headerGroup.id} className={clsx(theme.headerRow, classes?.headerRow)}>
            {headerGroup.headers.map((header) => {
              const hasSorting = sorting?.columns.includes(header.id);

              return (
                <th
                  key={header.id}
                  className={clsx(theme.headerCell, classes?.headerCell)}
                  style={{
                    position: 'relative',
                    width: header.getSize(),
                    maxWidth: header.getSize(),
                  }}
                >
                  <span className="flex items-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {hasSorting && (
                      <SortingIndicator
                        state={sortingState}
                        onChange={handleChangeSorting}
                        headerId={header.id}
                        multiple={sorting?.multiple}
                      />
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
};
