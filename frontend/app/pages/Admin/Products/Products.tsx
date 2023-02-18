import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import type { FC } from "react";
import { useSearchParams } from "@remix-run/react";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import isNull from "lodash/isNull";
import { SearchingPanel } from "~/components/search";
import { DEBOUNCE_TIMEOUT, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "~/constants";
import { productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { ProductsTable } from "~/pages/Admin/Products/ProductsTable";
import { ETableColumns } from "~/pages/Admin/Products/ProductsTable/enums";
import { TProducts } from "~/shared/api/products";
import { mapTableSortingToDto } from "~/shared/api/sorting";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import type { TTableSortingColumnState } from "~/uikit/Table/types";
import styles from "./Products.module.css";

type SearchParams = {
  page: string;
  size: string;
  search?: string;
  sort?: string;
};

type TProps = {
  products: TProducts;
};

export const Products: FC<TProps> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const defaultSearch: string = !isNull(search) ? search : "";
  const defaultSort: string = !isNull(sort) ? sort : "";
  const [isSearchActive, setIsSearchActive] = useState(false);

  const page = !isNil(products.currentPage)
    ? products.currentPage.toString()
    : DEFAULT_PAGE_SIZE.toString();
  const size = !isNil(products.pageSize)
    ? products.pageSize.toString()
    : DEFAULT_PAGE_SIZE.toString();

  const getSearchParams = (params: Partial<SearchParams>) => {
    const defaultSearchParams: SearchParams = {
      page,
      size,
      search: isEmpty(defaultSearch) ? undefined : defaultSearch,
      sort: isEmpty(defaultSort) ? undefined : defaultSort,
    };
    const mergedParams = {
      ...defaultSearchParams,
      ...params,
    };
    return Object.fromEntries(
      Object.entries(mergedParams).filter(([_key, value]) => !isEmpty(value)),
    );
  };

  const handleChangePage = ({ selected }: { selected: number }) => {
    setSearchParams(
      getSearchParams({
        page: (selected + 1).toString(),
      }),
    );
  };

  const handleChangeSize = useCallback(
    (pageSize: number) => {
      setSearchParams(
        getSearchParams({
          size: pageSize.toString(),
        }),
      );
    },
    [defaultSearch],
  );

  const handleSearchBlur = () => {
    setIsSearchActive(false);
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsSearchActive(false);
    }
  };

  const handleSortTableByProperty = (
    params?: TTableSortingColumnState | TTableSortingColumnState[],
  ) => {
    const formattedParams = mapTableSortingToDto(params);
    setSearchParams(
      getSearchParams({
        sort: formattedParams.sort,
        page: DEFAULT_PAGE.toString(),
      }),
    );
  };

  const debouncedFetcher = useCallback(
    debounce((query: string) => {
      setSearchParams(
        getSearchParams({
          search: query,
          page: DEFAULT_PAGE.toString(),
        }),
      );
    }, DEBOUNCE_TIMEOUT),
    [searchParams],
  );

  const handleSearchSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    debouncedFetcher(event.target.value);
  };

  return (
    <section>
      <div className="Products-Header">
        <div>
          <h1 className="Products-Title">
            <Typography variant={ETypographyVariant.TextH1Bold}>Продукты</Typography>
          </h1>
        </div>
        <div className="Products-HeaderControls">
          <SearchingPanel
            className="Products-SearchingPanel"
            defaultSearch={defaultSearch}
            isActive={isSearchActive}
            onBlur={handleSearchBlur}
            onClick={handleSearchFocus}
            onFocus={handleSearchFocus}
            onKeyDown={handleSearchKeyDown}
            onSubmit={handleSearchSubmit}
          />
          <LinkButton href="/admin/products/add">Добавить</LinkButton>
        </div>
      </div>
      <ProductsTable
        fieldsSortState={{
          columns: [
            ETableColumns.Alias,
            ETableColumns.CreatedAt,
            ETableColumns.ModifyDate,
            ETableColumns.Name,
          ],
          multiple: true,
          onChangeSorting: handleSortTableByProperty,
        }}
        products={products}
        onChangePage={handleChangePage}
        onChangePageSize={handleChangeSize}
      />
    </section>
  );
};

export function productsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...productAddLinks()];
}
