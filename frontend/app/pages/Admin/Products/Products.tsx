import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import debounce from "lodash/debounce";
import isNil from "lodash/isNil";
import isNull from "lodash/isNull";
import { SearchingPanel } from "~/components/search";
import { DEBOUNCE_TIMEOUT, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "~/constants";
import { productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { ProductsTable } from "~/pages/Admin/Products/ProductsTable";
import { TProducts } from "~/shared/api/products";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import styles from "./Products.module.css";
import { TParams } from "~/types";
import isEmpty from "lodash/isEmpty";

type TProps = {
  products: TProducts;
};

export const Products: FC<TProps> = ({ products }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const defaultSearch: string = !isNull(search) ? search : "";
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filter, setFilter] = useState<TParams>({
    page: Number(searchParams.get("page")) || DEFAULT_PAGE,
    size: Number(searchParams.get("size")) || DEFAULT_PAGE_SIZE,
    search: searchParams.get("search") || "",
  });

  const page = !isNil(products.currentPage)
    ? products.currentPage.toString()
    : DEFAULT_PAGE_SIZE.toString();
  const size = !isNil(products.pageSize)
    ? products.pageSize.toString()
    : DEFAULT_PAGE_SIZE.toString();

  const handleChangePage = ({ selected }: { selected: number }) => {
    if (isEmpty(defaultSearch)) {
      setSearchParams({ page: (selected + 1).toString(), size });
    } else {
      setSearchParams({ page: (selected + 1).toString(), size, search: defaultSearch });
    }
  };

  const handleChangeSize = useCallback(
    (pageSize: number) => {
      if (isEmpty(defaultSearch)) {
        setSearchParams({ page: DEFAULT_PAGE.toString(), size: pageSize.toString() });
      } else {
        setSearchParams({
          page: DEFAULT_PAGE.toString(),
          size: pageSize.toString(),
          search: defaultSearch,
        });
      }
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

  const debouncedFetcher = useCallback(
    debounce((query: string) => {
      if (isEmpty(query)) {
        setSearchParams({
          page: DEFAULT_PAGE.toString(),
          size,
        });
      } else {
        setSearchParams({
          page: DEFAULT_PAGE.toString(),
          size,
          search: query,
        });
      }
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
