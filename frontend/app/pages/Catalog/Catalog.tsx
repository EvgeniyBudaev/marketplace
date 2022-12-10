import React, { useCallback, useState } from "react";
import type { FC } from "react";
import { useFetcher } from "@remix-run/react";
import IsNull from "lodash/isNull";
import { Filter } from "./Filter";
import { Panel } from "./Panel";
import { ProductList } from "./ProductList";
import { attributeItemLinks } from "~/pages/Catalog/AttributeItem";
import { filterLinks } from "~/pages/Catalog/Filter";
import { panelLinks } from "~/pages/Catalog/Panel";
import { productListLinks } from "~/pages/Catalog/ProductList";
import { productListItemLinks } from "~/pages/Catalog/ProductListItem";
import { TCatalogDetail } from "~/shared/api/catalogs";
import { TProducts } from "~/shared/api/products";
import { TParams } from "~/types";
import { transformObjectToURLParams } from "~/utils";
import styles from "./Catalog.module.css";
import { usePaging } from "~/hooks";

type TProps = {
  catalog: TCatalogDetail;
  products: TProducts;
};

export const Catalog: FC<TProps> = (props) => {
  const [isClickedDisplayLine, setIsClickedDisplayLine] = useState(false);

  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const fetcherResponse = fetcher.data;
  const catalog: TCatalogDetail = fetcherResponse?.catalog ?? props.catalog;
  const products: TProducts = fetcherResponse?.products ?? props.products;
  const hasContent = !!products?.content.length;

  const handleDisplayLine = () => {
    setIsClickedDisplayLine((prev) => !prev);
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

  const initialPageSize = IsNull(products.pageSize) ? 5 : products.pageSize;

  const { onChangePage } = usePaging(onLoadProducts, {
    page: products.currentPage,
    pageSize: fetcher.data?.products.pageSize ?? initialPageSize,
  });

  const onButtonClick = () => {
    onChangePage(products.currentPage + 1);
  };

  return (
    <>
      <div className="Catalog">
        <div className="Catalog-Row">
          <h1 className="Catalog-Title">{catalog?.name}</h1>
          <button onClick={() => onButtonClick()}>Load server</button>
        </div>
        <div className="Catalog-Inner">
          {catalog && <Filter catalog={catalog} />}
          <div className="Catalog-Wrapper">
            <Panel isClickedDisplayLine={isClickedDisplayLine} onDisplayLine={handleDisplayLine} />
            <ProductList
              products={products?.content ?? []}
              isClickedDisplayLine={isClickedDisplayLine}
            />
          </div>
        </div>
      </div>
    </>
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
  ];
}
