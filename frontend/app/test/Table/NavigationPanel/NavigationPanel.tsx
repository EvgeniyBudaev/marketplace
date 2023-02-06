import * as React from 'react';

import { PageSize } from '~/components';
import type { TDropdownPosition } from '~/components';
import { DEFAULT_PAGE_SIZE_OPTIONS } from './constants';

import { Pagination } from '../Pagination';

export type TNavigationPanelProps = {
  amountPages?: number;
  canPreviousPage?: boolean;
  canNextPage?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onChangePage?: (page: number) => void;
  label?: string;
  nextPage: () => void;
  pageCount?: number;
  pageIndex: number;
  dropdownPosition?: TDropdownPosition;
  disabled?: boolean;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  dataTestId?: string;
  zeroBasedPageNumber: boolean;
};

const NavigationPanelComponent: React.FC<TNavigationPanelProps> = ({
  amountPages,
  canPreviousPage,
  canNextPage,
  defaultPageSize = DEFAULT_PAGE_SIZE_OPTIONS[0],
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onChangePage = () => {},
  label,
  nextPage,
  pageCount = null,
  pageIndex,
  dropdownPosition,
  disabled,
  previousPage,
  setPageSize,
  dataTestId,
  zeroBasedPageNumber,
}) => {
  const hasNextPreviousPagination = pageCount === null && (canNextPage || canPreviousPage);
  const hasIndexedPagination = pageCount && pageCount > 1;
  const shouldShowPagination = hasNextPreviousPagination || hasIndexedPagination;

  return (
    <div className="mt-8 flex items-start justify-between gap-x-8" data-testid={dataTestId}>
      <PageSize
        defaultPageSize={defaultPageSize}
        options={pageSizeOptions}
        label={label}
        dropdownPosition={dropdownPosition}
        setPageSize={setPageSize}
        disabled={disabled}
      />

      {shouldShowPagination && (
        <Pagination
          amountPages={amountPages}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
          pageIndex={pageIndex}
          pageCount={pageCount}
          previousPage={previousPage}
          onChangePage={onChangePage}
          disabled={disabled}
          zeroBasedPageNumber={zeroBasedPageNumber}
        />
      )}
    </div>
  );
};

export const NavigationPanel = React.memo(NavigationPanelComponent);
