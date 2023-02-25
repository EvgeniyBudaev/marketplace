import { useCallback, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useSearchParams } from "@remix-run/react";
import { createBrowserHistory } from "history";
import { DEFAULT_PAGE_SIZE } from "~/constants";
import { attributeItemLinks } from "~/pages/Catalog/AttributeItem";
import { filterLinks, getDefaultFilter } from "~/pages/Catalog/Filter";
import { panelLinks } from "~/pages/Catalog/Panel";
import { productListLinks } from "~/pages/Catalog/ProductList";
import { productListItemLinks } from "~/pages/Catalog/ProductListItem";
import { sortingLinks } from "~/pages/Catalog/Sorting";
import type { TCart } from "~/shared/api/cart";
import type { TCatalogDetail } from "~/shared/api/catalogs";
import type { TProductByCatalog, TProductsByCatalog } from "~/shared/api/products";
import type { TParams, TSorting } from "~/types";
import { ETypographyVariant, Typography } from "~/uikit";
import { Filter } from "./Filter";
import { Panel } from "./Panel";
import { ProductList } from "./ProductList";
import styles from "./Catalog.module.css";

type TProductRange = {
  startProduct: number;
  endProduct: number;
};

type TProps = {
  cart: TCart;
  catalog: TCatalogDetail;
  products: TProductsByCatalog;
};

const PLACEHOLDER_PRODUCT: TProductByCatalog = {
  id: 0,
  name: "Placeholder",
  price: "0",
  attributes: [],
  createdAt: "",
  alias: "placeholder",
  catalogAlias: "placeholder",
  count: "0",
  enabled: false,
  rating: 0,
};

const history = typeof document !== "undefined" ? createBrowserHistory() : null;

export const Catalog: FC<TProps> = (props) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const lastLoadedPage = useRef(page);
  const scrollIntoPage = useRef(page === 1 ? undefined : page);

  const [catalog, setCatalog] = useState(props.catalog);
  const [products, setProducts] = useState(props.products);
  const [pages, setPages] = useState(
    new Array(page - 1).fill(undefined).concat([props.products.content]),
  );

  const [isCardsLine, setIsCardsLine] = useState(false);
  const [productRange, setProductRange] = useState<TProductRange>({
    startProduct: 0,
    endProduct: 0,
  });

  const [sorting, setSorting] = useState<TSorting["value"]>(
    searchParams.get("sort") ?? "price_asc",
  );
  const [unappliedFilter, setUnappliedFilter] = useState<TParams>(
    getDefaultFilter(catalog, searchParams),
  );
  const [filter, setFilter] = useState<TParams>(unappliedFilter);
  const [isFiltersDirty, setIsFiltersDirty] = useState(false);

  useEffect(() => {
    setCatalog(props.catalog);
    setProducts(props.products);
    setPages((productList) => {
      const copy = [...productList];
      copy[props.products.currentPage - 1] = props.products.content;
      return copy;
    });
  }, [props.products, props.catalog]);

  const getFormData = useCallback(() => {
    const formData = new FormData();

    formData.append("sort", sorting);
    formData.append("page", page.toString());

    Object.entries(filter).forEach(([group, values]) => {
      values.forEach((value: string) => formData.append(group, value));
    });

    return formData;
  }, [sorting, filter, page]);

  useEffect(() => {
    if (lastLoadedPage.current !== page || isFiltersDirty) {
      lastLoadedPage.current = page;

      if (isFiltersDirty) {
        setPages([]);
        setIsFiltersDirty(false);
      }

      if (pages[page - 1] === undefined || isFiltersDirty) {
        setSearchParams(new URLSearchParams(getFormData() as any), { preventScrollReset: true });
      } else {
        history?.push({
          ...location,
          search: "?" + new URLSearchParams(getFormData() as any).toString(),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, filter, page]);

  const handleSortingChange = useCallback(
    (sorting: TSorting["value"]) => {
      setSorting(sorting);
      setPage(1);
      setIsFiltersDirty(true);
    },
    [setSorting, setIsFiltersDirty],
  );

  const handleFilterChange = useCallback(
    (filter: TParams) => {
      setUnappliedFilter(filter);
    },
    [setUnappliedFilter],
  );

  const handleFilterSubmit = useCallback(() => {
    setFilter(unappliedFilter);
    setPage(1);
    setIsFiltersDirty(true);
  }, [setFilter, unappliedFilter, setIsFiltersDirty]);

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
    },
    [setPage],
  );

  const getMoreProducts = async () => {
    if (products.content.length < products.countOfResult) {
      setPage(pages.length + 1);
    }
  };

  useEffect(() => {
    const { countOfResult: totalItemsCount, currentPage } = products;
    const pageItemsCount = products.content.length;

    setProductRange({
      startProduct: (currentPage - 1) * pageItemsCount + 1,
      endProduct: Math.min(currentPage * pageItemsCount, totalItemsCount),
    });
  }, [products]);

  const onCardsSwitcher = () => {
    setIsCardsLine((prev) => !prev);
  };

  const getRenderedProductsCount = useCallback(() => {
    return pages.map((page) => page?.length ?? DEFAULT_PAGE_SIZE).reduce((a, b) => a + b, 0);
  }, [pages]);

  return (
    <section className="Catalog">
      <div className="Catalog-Row">
        <h1 className="Catalog-Title">
          <Typography variant={ETypographyVariant.TextH1Bold}>{catalog?.name}</Typography>
        </h1>
        <Typography variant={ETypographyVariant.TextB3Regular}>
          {productRange.endProduct} из {products.countOfResult} товаров
        </Typography>
      </div>
      <div className="Catalog-Inner">
        <Filter
          catalog={catalog}
          onFilterChange={handleFilterChange}
          onFilterSubmit={handleFilterSubmit}
          filter={unappliedFilter}
        />
        <div className="Catalog-Wrapper">
          <Panel
            isCardsLine={isCardsLine}
            onCardsSwitcher={onCardsSwitcher}
            onSortingChange={handleSortingChange}
            sorting={sorting}
          />
          <InfiniteScroll
            dataLength={pages.length}
            next={getMoreProducts}
            hasMore={getRenderedProductsCount() < products.countOfResult}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <ProductList
              cart={props.cart}
              catalog={catalog}
              pages={pages.map(
                (page) =>
                  page ?? Array(products.pageSize ?? DEFAULT_PAGE_SIZE).fill(PLACEHOLDER_PRODUCT),
              )}
              isCardsLine={isCardsLine}
              onPageChange={handlePageChange}
              scrollIntoPage={scrollIntoPage.current}
            />
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
};

export function catalogLinks() {
  return [
    { rel: "stylesheet", href: styles },
    ...attributeItemLinks(),
    ...filterLinks(),
    ...panelLinks(),
    ...productListLinks(),
    ...productListItemLinks(),
    ...sortingLinks(),
  ];
}
