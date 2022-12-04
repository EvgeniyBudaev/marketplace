"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { TParams } from "src/types";
import { transformObjectToURLParams } from "src/utils";
import { ProductList } from "./ProductList";
import classes from "./Catalog.module.scss";
import isNil from "lodash/isNil";

type TTodo = {
  id: number;
  title: string;
};

type TProps = {
  todos: TTodo[];
};

export const Todos: FC<TProps> = ({ todos }) => {
  const [isClickedDisplayLine, setIsClickedDisplayLine] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [productList, setProductList] = useState<TTodo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (fetching) {
      onLoad({
        _page: currentPage + 1,
      });
      setProductList([...productList, ...todos]);
      setCurrentPage(prevState => prevState + 1);
      setTotalCount(100);
    }
    setFetching(false);
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  const onLoad = useCallback((params?: TParams) => {
    if (todos) {
      router.push(
        `/catalog/mirrors?${transformObjectToURLParams({ ...params })}`
      );
    }
  }, []);

  const onScroll = (event: any) => {
    const element = event.target.documentElement;
    const documentRect = document.documentElement.getBoundingClientRect();
    if (documentRect.bottom < document.documentElement.clientHeight + 150) {
      setFetching(true);
    }
    // if (element.scrollHeight - (element.scrollTop + window.innerHeight) < 180 && productList.length < totalCount) {
    //   setFetching(true);
    // }
  };

  return (
    <div className={classes.Catalog}>
      <div className={classes.Row}>
        <h1 className={classes.Title}>Todos</h1>
      </div>
      <div className={classes.Inner}>
        <div className={classes.Wrapper}>
          {!isNil(todos) &&
            todos.map(product => (
              <div key={product.id} style={{ height: "50px" }}>
                {product.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
