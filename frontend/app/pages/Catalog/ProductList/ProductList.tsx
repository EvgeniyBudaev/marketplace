import { FC } from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { TProduct } from "~/shared/api/products";
import { ProductListItem } from "../ProductListItem";
import styles from "./ProductList.module.css";

type TProps = {
  products: TProduct[];
  isCardsLine: boolean;
};

export const ProductList: FC<TProps> = ({ products, isCardsLine }) => {
  return (
    <ul
      className={clsx("ProductList", {
        ProductList__line: isCardsLine,
      })}
    >
      {!isNil(products) &&
        products.map((product) => (
          <ProductListItem key={product.id} product={product} isCardsLine={isCardsLine} />
        ))}
    </ul>
  );
};

export function productListLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
