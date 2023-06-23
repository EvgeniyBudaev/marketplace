import {useCallback, useRef, useState} from "react";
import type {KeyboardEvent, FC, FormEvent} from "react";
import {CSSTransition} from "react-transition-group";
import {useTranslation} from "react-i18next";
import {Form, useFetcher, useSearchParams} from "@remix-run/react";
import clsx from "clsx";
import debounce from "lodash/debounce";
import isNull from "lodash/isNull";

import {DEBOUNCE_TIMEOUT, TRANSITION} from "~/constants";
import {ERoutes} from "~/enums";
import type {TProductsByCatalog} from "~/shared/api/products";
import {EFormMethods} from "~/shared/form";
import {Icon, Overlay} from "~/uikit";

import {SearchGlobalList, searchGlobalListLinks} from "./SearchGlobalList";
import {searchGlobalListItemLinks} from "./SearchGlobalListItem";
import commonStyles from "./Common.css";
import styles from "./SearchGlobal.css";

type TProps = {
  className?: string;
  transition?: number;
};

export const SearchGlobal: FC<TProps> = ({className, transition = TRANSITION}) => {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const {t} = useTranslation();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const defaultSearch: string = !isNull(search) ? search : "";
  const fetcher = useFetcher();
  const productList: TProductsByCatalog = fetcher.data ?? null;

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleFocus = () => {
    setIsActive(true);
    fetcher.submit(
      {search: ""},
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
        className={clsx("SearchGlobal", className, {
          SearchGlobal__active: isActive,
        })}
      >
        <div className="SearchGlobal-Form">
          <div className="SearchGlobal-InputWrapper">
            <Form method={EFormMethods.Get} onChange={handleSubmit}>
              <input
                autoComplete="off"
                className="SearchGlobal-Input"
                defaultValue={defaultSearch}
                name="search"
                placeholder={t("common.actions.search") ?? "Search"}
                ref={inputRef}
                type="text"
                onBlur={handleBlur}
                onClick={handleFocus}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
              />
            </Form>
          </div>
          <Icon className="SearchGlobal-Icon" type="Search"/>
        </div>
        <CSSTransition
          className="SearchGlobalDropDownWindow"
          in={isActive}
          nodeRef={nodeRef}
          timeout={transition}
          unmountOnExit
        >
          <div ref={nodeRef}>
            <SearchGlobalList productList={productList} onBlur={handleBlur}/>
          </div>
        </CSSTransition>
      </div>
      <Overlay timeout={transition} isActive={isActive} onClick={handleBlur}/>
    </>
  );
};

export function searchGlobalLinks() {
  return [
    {rel: "stylesheet", href: styles},
    {rel: "stylesheet", href: commonStyles},
    ...searchGlobalListLinks(),
    ...searchGlobalListItemLinks(),
  ];
}
