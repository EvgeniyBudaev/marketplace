import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

import { ButtonPagination } from '~/components';

import { PaginationPaging } from './PaginationPaging';

export type TPaginationProps = {
  amountPages?: number;
  canPreviousPage?: boolean;
  canNextPage?: boolean;
  nextPage: () => void;
  pageIndex: number;
  pageCount: number | null;
  disabled?: boolean;
  previousPage: () => void;
  onChangePage: (page: number) => void;
  dataTestId?: string;
  zeroBasedPageNumber: boolean;
};

const PaginationComponent: React.FC<TPaginationProps> = ({
  amountPages = 3,
  canPreviousPage,
  canNextPage,
  onChangePage,
  nextPage,
  pageCount,
  pageIndex,
  disabled,
  previousPage,
  dataTestId,
  zeroBasedPageNumber,
}) => {
  return (
    <div className="flex items-center gap-x-2" data-testid={dataTestId}>
      <ButtonPagination
        disabled={!canPreviousPage || disabled}
        onClick={previousPage}
        theme="outlined"
      >
        <ChevronLeftIcon className="text-grey-dark h-6 w-6" />
      </ButtonPagination>

      {pageCount ? (
        <PaginationPaging
          amountPages={amountPages}
          onChangePage={onChangePage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          disabled={disabled}
          zeroBasedPageNumber={zeroBasedPageNumber}
        />
      ) : (
        <div className="text-dark min-w-[3rem] text-center text-base font-semibold">
          {pageIndex}
        </div>
      )}

      <ButtonPagination disabled={!canNextPage || disabled} onClick={nextPage} theme="outlined">
        <ChevronRightIcon className="text-grey-dark h-6 w-6" />
      </ButtonPagination>
    </div>
  );
};

export const Pagination = React.memo(PaginationComponent);
