import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer as AlertContainer } from "react-toastify";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { Icon, Overlay } from "src/uikit";
import "./Common.scss";
import classes from "./Search.module.scss";

export interface ISearchProps {
  className?: string;
  transition?: number;
  isHomePage?: boolean;
}

export const Search: React.FC<ISearchProps> = ({
  className,
  transition = 300,
  isHomePage,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [productList, setProductList] = useState([]);
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedKeyword(event.target.value);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const fetchSearchItems = useCallback(
    (searchedKeyword: string) => {
      //dispatch(loadingActionCreators.setLoading());
      // searchApi...
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    fetchSearchItems(searchedKeyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedKeyword]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsActive(false);
    }
  };

  return (
    <>
      <div
        className={clsx(classes.Search, className, {
          [classes.Search__active]: isActive,
          [classes.Search__isHomePage]: isHomePage,
        })}
      >
        <AlertContainer />
        <div className={classes.Form}>
          <div className={classes.SearchInputWrapper}>
            <input
              className={classes.SearchInput}
              autoComplete="off"
              name="search"
              placeholder="Поиск"
              type="text"
              value={searchedKeyword}
              onBlur={handleBlur}
              onChange={handleChange}
              onClick={handleFocus}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Icon className={classes.SearchIcon} type="Search" />
        </div>
        <CSSTransition
          className="SearchDropDownWindow"
          in={isActive}
          nodeRef={nodeRef}
          timeout={transition}
          unmountOnExit
        >
          <div ref={nodeRef}>
            {/*<SearchProductList productList={productList} />*/}
          </div>
        </CSSTransition>
      </div>
      <Overlay timeout={transition} isActive={isActive} onClick={handleBlur} />
    </>
  );
};
