import { FC } from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { TProduct } from "~/shared/api/products";
import { ProductListItem } from "../ProductListItem";
import styles from "./ProductList.module.css";

type TProps = {
  products: TProduct[];
  isClickedDisplayLine: boolean;
};

export const ProductList: FC<TProps> = ({ products, isClickedDisplayLine }) => {
  return (
    <ul
      className={clsx("ProductList", {
        ProductList__line: isClickedDisplayLine,
      })}
    >
      {!isNil(products) &&
        products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            isClickedDisplayLine={isClickedDisplayLine}
          />
        ))}
    </ul>
  );
};

export function productListLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
