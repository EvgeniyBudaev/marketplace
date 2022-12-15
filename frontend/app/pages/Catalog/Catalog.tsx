import { useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFetcher } from "@remix-run/react";
import IsNull from "lodash/isNull";
import { usePaging } from "~/hooks";
import { attributeItemLinks } from "~/pages/Catalog/AttributeItem";
import { cardsSwitcherLinks } from "~/pages/Catalog/CardsSwitcher";
import { filterLinks } from "~/pages/Catalog/Filter";
import { panelLinks } from "~/pages/Catalog/Panel";
import { productListLinks } from "~/pages/Catalog/ProductList";
import { productListItemLinks } from "~/pages/Catalog/ProductListItem";
import { sortingLinks } from "~/pages/Catalog/Sorting";
import { TCatalogDetail } from "~/shared/api/catalogs";
import { TProduct, TProducts } from "~/shared/api/products";
import { TParams, TSorting } from "~/types";
import { transformObjectToURLParams } from "~/utils";
import { Filter } from "./Filter";
import { Panel } from "./Panel";
import { ProductList } from "./ProductList";
import styles from "./Catalog.module.css";
import { DEFAULT_PAGE_SIZE } from "~/constants";

type TProductRange = {
  startProduct: number;
  endProduct: number;
};

type TProps = {
  catalog: TCatalogDetail;
  products: TProducts;
};

export const Catalog: FC<TProps> = (props) => {
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const fetcherResponse = fetcher.data;
  const catalog: TCatalogDetail = fetcherResponse?.catalog ?? props.catalog;
  const products: TProducts = fetcherResponse?.products ?? props.products;
  const hasContent = !!products?.content.length;

  const [isCardsLine, setIsCardsLine] = useState(false);
  const [productList, setProductList] = useState<TProduct[]>(products.content);
  const [productRange, setProductRange] = useState<TProductRange>({
    startProduct: 0,
    endProduct: 0,
  });
  const { countOfResult: totalItemsCount, currentPage } = products;
  const pageItemsCount = productList.length;

  useEffect(() => {
    const lastPage = Math.max(Math.ceil(totalItemsCount / pageItemsCount), 1);

    if (currentPage === lastPage) {
      setProductRange({
        startProduct: (currentPage - 1) * pageItemsCount + 1,
        endProduct: totalItemsCount,
      });
    } else {
      setProductRange({
        startProduct: (currentPage - 1) * pageItemsCount + 1,
        endProduct: currentPage * pageItemsCount,
      });
    }
  }, [currentPage, pageItemsCount, totalItemsCount]);

  const onCardsSwitcher = () => {
    setIsCardsLine((prev) => !prev);
  };

  const onLoadProducts = useCallback(
    (params?: TParams) => {
      if (catalog) {
        fetcher.load(
          `/catalog/${catalog.alias}?index&${transformObjectToURLParams({ ...params })}`,
        );
      }
    },
    [fetcher],
  );

  const initialPageSize = IsNull(products.pageSize) ? DEFAULT_PAGE_SIZE : products.pageSize;

  const { onChangePage, onFilter, onReset, onSorting } = usePaging(onLoadProducts, {
    page: products.currentPage,
    pageSize: fetcher.data?.products.pageSize ?? initialPageSize,
  });

  useEffect(() => {
    if (fetcher.data && fetcher.data.products.content.length > 0) {
      setProductList((prevPhotos: TProduct[]) => [...prevPhotos, ...fetcher.data.products.content]);
    }
  }, [fetcher.data]);

  const getMoreProducts = async () => {
    if (productList.length >= products.countOfResult) return;
    onChangePage(products.currentPage + 1);
  };

  const handleFilter = (params: TParams) => {
    onFilter(params);
    setProductList([]);
    onReset();
  };

  const handleSorting = (params?: TSorting) => {
    if (params) {
      onSorting(params);
      setProductList([]);
      onReset();
    }
  };

  return (
    <section className="Catalog">
      <div className="Catalog-Row">
        <h1 className="Catalog-Title">{catalog?.name}</h1>
        <span>
          {productRange.endProduct} из {totalItemsCount} товаров
        </span>
      </div>
      <div className="Catalog-Inner">
        <Filter catalog={catalog} onLoad={handleFilter} />
        <div className="Catalog-Wrapper">
          <Panel
            isCardsLine={isCardsLine}
            onCardsSwitcher={onCardsSwitcher}
            onSorting={handleSorting}
          />
          <InfiniteScroll
            dataLength={productList.length}
            next={getMoreProducts}
            hasMore={true}
            loader={isLoading ? <h4>Loading...</h4> : null}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <ProductList products={productList} isCardsLine={isCardsLine} />
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
    ...cardsSwitcherLinks(),
    ...filterLinks(),
    ...panelLinks(),
    ...productListLinks(),
    ...productListItemLinks(),
    ...sortingLinks(),
  ];
}
