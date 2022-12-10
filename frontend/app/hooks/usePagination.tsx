import React, { ComponentType, FC, useCallback, useEffect, useRef, useState } from "react";
import { InView } from "react-intersection-observer";

type TProps = {
  page?: number;
  placeholderComponent: ComponentType;
  pageComponent: ComponentType<{ page: number; onLoaded: () => void }>;
  loadMoreComponent: ComponentType<{ onClick: () => void }>;
  onPageChange?: (page: number) => void;
};

enum PageState {
  Deferred,
  Loading,
  Loaded,
}

export const usePagination = (props: TProps) => {
  const [currentPage, setCurrentPage] = useState(props.page ?? 0);
  const [pagesState, setPagesState] = useState(
    Array.from({ length: currentPage + 1 }, () => PageState.Deferred),
  );

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadNext = useCallback(() => {
    if (pagesState[pagesState.length - 1] === PageState.Loaded) {
      setPagesState((loadState) => [...loadState, PageState.Loading]);

      console.log(`Kekpek ${pagesState.length}`);
      setCurrentPage(pagesState.length);
    }
  }, [setPagesState, setCurrentPage, pagesState]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadNext();
        }
      },
      {
        threshold: 1,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [loadMoreRef, pagesState, loadNext]);

  const onPageLoaded = useCallback(
    (page: number) => {
      setPagesState((pagesState) => {
        const newLoadingState = [...pagesState];
        newLoadingState[page] = PageState.Loaded;
        return newLoadingState;
      });
    },
    [setPagesState],
  );

  useEffect(() => {
    props.onPageChange?.(currentPage);
  }, [currentPage, props.onPageChange]);

  const changeCurrentPage = useCallback(
    (page: number) => {
      setCurrentPage(page);

      if (pagesState[page] === PageState.Deferred) {
        setPagesState((pagesState) => {
          const newPagesState = [...pagesState];
          newPagesState[page] = PageState.Loading;
          return newPagesState;
        });
      }
    },
    [setCurrentPage, setPagesState, pagesState],
  );

  return { changeCurrentPage, loadMoreRef, loadNext, onPageLoaded, PageState, pagesState };
};
