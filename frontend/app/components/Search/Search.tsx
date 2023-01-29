import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, FC, FormEvent } from "react";
import { CSSTransition } from "react-transition-group";
import { Form, useFetcher, useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import debounce from "lodash/debounce";
import isNull from "lodash/isNull";

import { TRANSITION } from "~/constants";
import { ERoutes } from "~/enums";
import type { TProducts } from "~/shared/api/products";
import { EFormMethods } from "~/shared/form";
import { Icon, Overlay } from "~/uikit";

import { SearchList, searchListLinks } from "./SearchList";
import { searchListItemLinks } from "./SearchListItem";
import commonStyles from "./Common.css";
import styles from "./Search.module.css";

type TProps = {
  className?: string;
  transition?: number;
  isHomePage?: boolean;
};

export const Search: FC<TProps> = ({ className, transition = TRANSITION, isHomePage }) => {
  const DEBOUNCE_TIMEOUT = 300;
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const defaultSearch: string = !isNull(search) ? search : "";
  const fetcher = useFetcher();
  const productList: TProducts = fetcher.data ?? null;

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleFocus = () => {
    setIsActive(true);
    fetcher.submit(
      { search: "" },
      {
        method: EFormMethods.Get,
        action: ERoutes.ResourcesSearch,
      },
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsActive(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetcher = useCallback(
    debounce((query) => {
      fetcher.submit(query, {
        method: EFormMethods.Get,
        action: ERoutes.ResourcesSearch,
      });
    }, DEBOUNCE_TIMEOUT),
    [],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debouncedFetcher(event.currentTarget);
  };

  return (
    <>
      <div
        className={clsx("Search", className, {
          Search__active: isActive,
          Search__isHomePage: isHomePage,
        })}
      >
        <div className="Search-Form">
          <div className="Search-InputWrapper">
            <Form method={EFormMethods.Get} onChange={handleSubmit}>
              <input
                autoComplete="off"
                className="Search-Input"
                defaultValue={defaultSearch}
                name="search"
                placeholder="Поиск"
                ref={inputRef}
                type="text"
                onBlur={handleBlur}
                onClick={handleFocus}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
              />
            </Form>
          </div>
          <Icon className="Search-Icon" type="Search" />
        </div>
        <CSSTransition
          className="SearchDropDownWindow"
          in={isActive}
          nodeRef={nodeRef}
          timeout={transition}
          unmountOnExit
        >
          <div ref={nodeRef}>
            <SearchList productList={productList} onBlur={handleBlur} />
          </div>
        </CSSTransition>
      </div>
      <Overlay timeout={transition} isActive={isActive} onClick={handleBlur} />
    </>
  );
};

export function searchLinks() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: commonStyles },
    ...searchListLinks(),
    ...searchListItemLinks(),
  ];
}
