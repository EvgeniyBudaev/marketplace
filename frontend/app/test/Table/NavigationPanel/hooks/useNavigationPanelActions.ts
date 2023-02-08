import * as React from "react";

type TUseNavigationPanelActionsProps = {
  onChangeParams?: (params: Record<string, any>) => void;
  onChangePageSize?: (size: number) => Promise<void>;
  onChangePage?: (page: number) => Promise<void>;
  params?: Record<string, any>;
  page: number;
};

type TUseNavigationPanelActionsResponse = {
  previousPage: () => void;
  nextPage: () => void;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
  setPageSize: (size: number) => void;
};

export const useNavigationPanelActions = ({
  onChangeParams,
  onChangePageSize,
  onChangePage,
  params,
  page,
}: TUseNavigationPanelActionsProps): TUseNavigationPanelActionsResponse => {
  const previousPage = React.useCallback(() => {
    const newPage = page - 1;

    onChangePage?.(newPage);
    onChangeParams?.({ ...params, page: newPage });
  }, [onChangeParams, onChangePage, params, page]);

  const nextPage = React.useCallback(() => {
    const newPage = page + 1;

    onChangePage?.(newPage);
    onChangeParams?.({ ...params, page: newPage });
  }, [onChangeParams, onChangePage, params, page]);

  const gotoPage = React.useCallback(
    (updater: ((pageIndex: number) => number) | number) => {
      const setPage = typeof updater === "function" ? updater(page) : updater;
      const newPage = setPage + 1;

      onChangePage?.(newPage);
      onChangeParams?.({ ...params, page: newPage });
    },
    [onChangeParams, onChangePage, page, params],
  );

  const setPageSize = React.useCallback(
    async (size: number) => {
      await onChangePageSize?.(size);
      onChangeParams?.({ ...params, size, page: null });
    },
    [onChangePageSize, onChangeParams, params],
  );

  return {
    previousPage,
    nextPage,
    gotoPage,
    setPageSize,
  };
};
