import * as React from "react";

import { ButtonPagination } from "~/components";

import { getPaginationList } from "./utils";

export type TPaginationPagingProps = {
  amountPages: number;
  onChangePage: (page: number) => void;
  pageCount: number;
  pageIndex: number;
  disabled?: boolean;
  zeroBasedPageNumber: boolean;
};

const PaginationPagingComponent: React.FC<TPaginationPagingProps> = ({
  amountPages,
  onChangePage,
  pageCount,
  pageIndex,
  disabled,
  zeroBasedPageNumber,
}) => {
  const paginationList = getPaginationList(pageCount, pageIndex, amountPages);

  return (
    <div className="flex items-center gap-x-2">
      {paginationList.map((page, index) => {
        const isMin = pageCount - pageIndex > amountPages * 2;

        return (
          <React.Fragment key={page}>
            {isMin && index === amountPages && "..."}
            <ButtonPagination
              // для zeroBasedPageNumber применяем -1, потому что отображение пагинации будет всегда с 1, а для запроса нужен zeroBased подход
              onClick={() => onChangePage(zeroBasedPageNumber ? page - 1 : page)}
              disabled={disabled}
              theme={pageIndex === page ? "contained" : "outlined"}
            >
              {page}
            </ButtonPagination>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const PaginationPaging = React.memo(PaginationPagingComponent);
