"use client";

import { FC } from "react";
import classes from "./Catalog.module.scss";

type TProps = {
  data?: any;
};

export const Catalog: FC<TProps> = (props: any) => {
  console.log("Catalog props: ", props);
  const catalogName = "mirrors";
  return (
      <div className={classes.Catalog}>
        <div className={classes.Row}>
          <h1 className={classes.Title}>Зеркала</h1>
        </div>
          <div className={classes.Inner}></div>
      </div>
  );
};
