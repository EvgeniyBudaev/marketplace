import * as React from 'react';
import clsx from 'clsx';
import { ETableSortDirection } from '~/components/Table/constants';
import { ArrowDownIcon, ChevronDownIcon } from '~/icons';
import type { TSortingColumnStateWithReset } from '~/components/Table/Header/types';

type TProps = {
  state: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null;
  onChange: (
    value: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null,
  ) => void;
  multiple?: boolean;
  headerId: string;
};

export const SortingIndicator: React.FC<TProps> = ({ state, onChange, multiple, headerId }) => {
  const sortingState = multiple
    ? (state as Array<TSortingColumnStateWithReset>).find((item) => item.sortProperty === headerId)
    : (state as TSortingColumnStateWithReset);
  const isAlreadySorted = sortingState?.sortProperty === headerId;
  const hasColumnInArray = multiple && !!sortingState;

  const handleChange = (
    sortProperty: string,
    sortDirection: ETableSortDirection,
    shouldReset?: boolean,
  ) => {
    if (sortingState && sortProperty === sortingState.sortProperty && sortingState.shouldReset) {
      if (multiple) {
        onChange(
          (state as Array<TSortingColumnStateWithReset>).filter(
            (item) => item.sortProperty !== sortProperty,
          ),
        );
      } else {
        onChange(null);
      }

      return;
    }

    let preparedSortingParams: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> =
      { sortProperty, sortDirection, shouldReset };

    if (multiple) {
      preparedSortingParams = hasColumnInArray
        ? (state as Array<TSortingColumnStateWithReset>).map((item) =>
            item.sortProperty === sortProperty
              ? { sortProperty, sortDirection, shouldReset }
              : item,
          )
        : (state as Array<TSortingColumnStateWithReset>).concat([
            { sortDirection, sortProperty, shouldReset },
          ]);
    }

    onChange(preparedSortingParams);
  };

  return (
    <span className="ml-2 flex w-6 flex-col gap-y-[6px]">
      {isAlreadySorted ? (
        <button
          type="button"
          className={clsx('flex justify-center', {
            'rotate-180': sortingState.sortDirection === ETableSortDirection.Asc,
          })}
          onClick={() =>
            handleChange(
              headerId,
              sortingState.sortDirection === ETableSortDirection.Asc
                ? ETableSortDirection.Desc
                : ETableSortDirection.Asc,
              true,
            )
          }
        >
          <ChevronDownIcon />
        </button>
      ) : (
        <>
          <button
            className="flex h-4 rotate-180 justify-center"
            type="button"
            onClick={() => handleChange(headerId, ETableSortDirection.Asc)}
          >
            <ArrowDownIcon />
          </button>
          <button
            className="flex h-4 justify-center"
            type="button"
            onClick={() => handleChange(headerId, ETableSortDirection.Desc)}
          >
            <ArrowDownIcon />
          </button>
        </>
      )}
    </span>
  );
};
