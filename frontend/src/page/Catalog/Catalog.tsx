"use client";

import { FC, useState } from "react";
import { TProduct } from "src/types";
import { ProductList } from "./ProductList";
import classes from "./Catalog.module.scss";
import { Aside } from "./Aside";

type TProps = {
  products?: TProduct[];
};

export const Catalog: FC<TProps> = ({ products }) => {
  const [isClickedDisplayLine, setIsClickedDisplayLine] = useState(false);
  console.log("Catalog products: ", products);
  const catalogAlias = "mirrors";
  const catalogName = "Зеркала";
  return (
    <div className={classes.Catalog}>
      <div className={classes.Row}>
        <h1 className={classes.Title}>Зеркала</h1>
      </div>
      <div className={classes.Inner}>
        <Aside catalogAlias={catalogAlias} />
        <div className={classes.Wrapper}>
          <ProductList
            catalogName={catalogName}
            products={products}
            isClickedDisplayLine={isClickedDisplayLine}
          />
        </div>
      </div>
    </div>
  );
};
