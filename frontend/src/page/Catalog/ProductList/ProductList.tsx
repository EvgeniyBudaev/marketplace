import { FC } from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { TProduct } from "src/types";
import { ProductListItem } from "../ProductListItem";
import classes from "./ProductList.module.scss";

type TProps = {
  catalogName?: string;
  products?: TProduct[];
  isClickedDisplayLine: boolean;
};

export const ProductList: FC<TProps> = ({
  catalogName,
  products,
  isClickedDisplayLine,
}) => {
  return (
    <ul
      className={clsx(classes.ProductList, {
        [classes.ProductList__line]: isClickedDisplayLine,
      })}
    >
      {!isNil(products) &&
        products.map(product => (
          <ProductListItem
            key={product.id}
            product={product}
            isClickedDisplayLine={isClickedDisplayLine}
          />
        ))}
    </ul>
  );
};
