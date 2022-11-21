"use client";

import { FC } from "react";

type TProps = {
  data?: any;
};

export const Catalog: FC<TProps> = (props: any) => {
  console.log("Catalog props: ", props);
  return <div>Catalog</div>;
};
