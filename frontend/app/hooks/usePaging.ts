import { useCallback, useState } from "react";
import {TParams, TSorting} from "~/types";
import {mapSortingToDto} from "~/utils";

type TUsePaging = (
  onLoad: (params: Record<string, any>) => void,
  params: { page: number; pageSize: number },
) => {
  onChangePage: (page: number) => void;
  onChangePageSize: (size: number) => void;
  onFilter: (data?: TParams) => void;
  onReset: () => void;
  onSorting: (data?: TSorting) => void;
  page: number;
  pageSize: number;
};

export const usePaging: TUsePaging = (onLoad, { pageSize, page }) => {
  const [filter, setFilter] = useState({});

  const handleChangePage = useCallback(
    (currentPage: number) => {
      onLoad({ page: currentPage, pageSize });
    },
    [onLoad, pageSize],
  );

  const handleChangePageSize = useCallback(
    (size: number) => {
      onLoad({ page: 1, pageSize: size });
    },
    [onLoad],
  );

  const handleFilter = useCallback(
      (params?: TParams) => {
          console.log("params: ", params);
        let paramsToDto: TParams = {};

        params && Object.entries(params).forEach(([key, value]) => {
          if (value.length > 0) {
            paramsToDto[key] = value.join();
          }
        });
          console.log("paramsToDto: ", paramsToDto);
        setFilter({ ...filter, ...paramsToDto });
        onLoad({ page: 1, size: pageSize, ...filter, ...paramsToDto });
      },
      [onLoad, pageSize, filter],
  );

    const handleReset = useCallback(() => {
        setFilter(() => {});
    }, []);

    const handleSorting = useCallback(
        (params?: TSorting) => {
            console.log("usePaging params: ", params);
            console.log("mapSortingToDto(params): ", mapSortingToDto(params));
            setFilter((prev) => ({ ...prev, ...mapSortingToDto(params) }));
            onLoad({ page, pageSize, ...filter, ...mapSortingToDto(params) });
        },
        [filter, onLoad, pageSize, page],
    );

  return {
    onChangePage: handleChangePage,
    onChangePageSize: handleChangePageSize,
    onFilter: handleFilter,
    onReset: handleReset,
    onSorting: handleSorting,
    page,
    pageSize,
  };
};
