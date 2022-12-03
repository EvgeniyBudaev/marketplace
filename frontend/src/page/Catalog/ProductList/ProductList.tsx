import { FC } from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import {TProducts} from "src/entities/products";
import { ProductListItem } from "../ProductListItem";
import classes from "./ProductList.module.scss";

type TProps = {
  catalogName?: string;
  products?: TProducts;
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
        products?.content.map(product => (
          <ProductListItem
            key={product.id}
            product={product}
            isClickedDisplayLine={isClickedDisplayLine}
          />
        ))}
    </ul>
  );
};
