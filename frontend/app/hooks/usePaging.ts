import { useCallback } from "react";

type TUsePaging = (
  onLoad: (params: Record<string, any>) => void,
  params: { page: number; pageSize: number },
) => {
  onChangePage: (page: number) => void;
  onChangePageSize: (size: number) => void;
  page: number;
  pageSize: number;
};

export const usePaging: TUsePaging = (onLoad, { pageSize, page }) => {
  const handleChangePage = useCallback(
    (currentPage: number) => {
      onLoad({ page: currentPage, pageSize });
    },
    [onLoad, pageSize],
  );

  const handleChangePageSize = useCallback(
    (size: number) => {
      onLoad({ page: 1, size });
    },
    [onLoad],
  );

  return {
    onChangePage: handleChangePage,
    onChangePageSize: handleChangePageSize,
    page,
    pageSize,
  };
};
