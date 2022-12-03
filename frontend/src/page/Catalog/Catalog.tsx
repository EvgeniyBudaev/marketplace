"use client";

import { FC, useState } from "react";
import {TCatalog} from "src/entities/catalogs";
import {TProducts} from "src/entities/products";
import { Aside } from "./Aside";
import { ProductList } from "./ProductList";
import { Panel } from "./Panel"
import classes from "./Catalog.module.scss";

type TProps = {
  catalog?: TCatalog;
  products?: TProducts;
};

export const Catalog: FC<TProps> = ({ catalog, products }) => {
  const [isClickedDisplayLine, setIsClickedDisplayLine] = useState(false);

  const handleDisplayLine = () => {
    setIsClickedDisplayLine(prev => !prev);
  };

  return (
    <div className={classes.Catalog}>
      <div className={classes.Row}>
        <h1 className={classes.Title}>Зеркала</h1>
      </div>
      <div className={classes.Inner}>
        <Aside catalog={catalog} />
        <div className={classes.Wrapper}>
          <Panel
            isClickedDisplayLine={isClickedDisplayLine}
            onDisplayLine={handleDisplayLine}
          />
          <ProductList
            catalogName={catalog?.name}
            products={products}
            isClickedDisplayLine={isClickedDisplayLine}
          />
        </div>
      </div>
    </div>
  );
};
