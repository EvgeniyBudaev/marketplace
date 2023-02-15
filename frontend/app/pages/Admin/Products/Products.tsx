import { FormEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import { useFetcher, useNavigate, useSearchParams, useSubmit } from "@remix-run/react";
import { createBrowserHistory } from "history";
import debounce from "lodash/debounce";
import isNull from "lodash/isNull";
import { SearchingPanel } from "~/components/search";
import { DEBOUNCE_TIMEOUT, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "~/constants";
import { ERoutes } from "~/enums";
import { productAddLinks } from "~/pages/Admin/Products/ProductAdd";
import { ProductsTable } from "~/pages/Admin/Products/ProductsTable";
import { TProducts } from "~/shared/api/products";
import { EFormMethods } from "~/shared/form";
import { TParams } from "~/types";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import styles from "./Products.module.css";

type TProps = {
  products: TProducts;
};

export const Products: FC<TProps> = ({ products }) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const submit = useSubmit();
  const history = typeof document !== "undefined" ? createBrowserHistory() : null;
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const defaultSearch: string = !isNull(search) ? search : "";
  const [filter, setFilter] = useState<TParams>({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [pagination, setPagination] = useState({
    page: Number(searchParams.get("page")) || DEFAULT_PAGE,
    size: Number(searchParams.get("size")) || DEFAULT_PAGE_SIZE,
  });

  const getFormData = useCallback(() => {
    const formData = new FormData();

    // formData.append("sort", sorting);
    formData.append("page", pagination.page.toString());
    formData.append("size", pagination.size.toString());

    Object.entries(filter).forEach(([group, values]) => {
      values.forEach((value: string) => formData.append(group, value));
    });

    return formData;
  }, [pagination]);

  useEffect(() => {
    const query = "?" + new URLSearchParams(getFormData() as any).toString();
    navigate(query);
  }, [pagination]);

  const handleChangePage = useCallback(
    ({ selected }: { selected: number }) => {
      setPagination((prevState) => ({
        ...prevState,
        page: selected + 1,
      }));
    },
    [setPagination],
  );

  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      setPagination((prevState) => ({
        ...prevState,
        page: DEFAULT_PAGE,
        size: pageSize,
      }));
    },
    [setPagination],
  );

  const handleSearchBlur = () => {
    setIsSearchActive(false);
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
    fetcher.submit(
      { search: "" },
      {
        method: EFormMethods.Get,
        action: ERoutes.AdminProducts,
      },
    );
  };

  const handleSearchKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsSearchActive(false);
    }
  };

  const debouncedFetcher = useCallback(
    debounce((query) => {
      fetcher.submit(query, {
        method: EFormMethods.Get,
        action: ERoutes.AdminProducts,
      });
    }, DEBOUNCE_TIMEOUT),
    [],
  );

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debouncedFetcher(event.currentTarget);
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
        onChangePageSize={handleChangePageSize}
      />
    </section>
  );
};

export function productsLinks() {
  return [{ rel: "stylesheet", href: styles }, ...productAddLinks()];
}
