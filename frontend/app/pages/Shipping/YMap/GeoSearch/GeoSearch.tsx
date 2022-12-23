import { useCallback, useEffect, useRef } from "react";
import type { FocusEvent, HTMLProps } from "react";
import { withYMaps } from "@pbe/react-yandex-maps";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import { useDebounce } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import { MapInput } from "~/pages";
import styles from "./GeoSearch.module.css";

export type TGeoSearchState = {
  value: string;
  suggestions: TGeoSearchSuggestion[];
  showSuggestions: boolean;
};

export type TGeoSearchSuggestion = {
  uuid: string;
  displayName: string;
};

export function emptyMapSearchState(): TGeoSearchState {
  return {
    value: "",
    suggestions: [],
    showSuggestions: false,
  };
}

type TProps = {
  className?: string;
  error?: string;
  name?: string;
  state: TGeoSearchState;
  isFocused?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => void;
  onStateChange: (reducer: (state: TGeoSearchState) => TGeoSearchState) => void;
  onSearch?: (query: string) => void;
  suggestDebounce?: number;
} & Omit<HTMLProps<HTMLInputElement>, "onChange" | "value">;

export default withYMaps(
  (props: TProps) => {
    const {
      className,
      error,
      name,
      state,
      isFocused,
      onStateChange,
      onBlur,
      onFocus,
      onSearch,
      suggestDebounce,
      style,
      ...inputProps
    } = props;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ymaps } = props as any;

    const debounce = suggestDebounce ?? 1000;
    const [debouncedValue] = useDebounce(state.value, debounce, {
      maxWait: debounce,
    });
    const prevDebouncedValue = useRef<string | undefined>("");
    const getSuggestions = useCallback(() => {
      if (state.showSuggestions) {
        return state.suggestions;
      } else {
        return [];
      }
    }, [state]);

    useEffect(() => {
      let cancelled = false;
      if (debouncedValue) {
        const trimmed = debouncedValue.trim();
        if (trimmed.length && trimmed !== prevDebouncedValue.current && state.showSuggestions) {
          prevDebouncedValue.current = trimmed;

          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          ymaps.suggest(trimmed).then((newSuggestions: any[]) => {
            if (!cancelled) {
              onStateChange((state) => ({
                ...state,
                suggestions: newSuggestions.map((suggestion) => ({
                  uuid: uuidv4(),
                  displayName: suggestion.displayName,
                })),
              }));
            }
          });
        } else {
          onStateChange((state) => ({
            ...state,
            suggestions: [],
          }));
        }
      }

      return () => void (cancelled = true);
    }, [debouncedValue, ymaps, onStateChange, state.showSuggestions]);

    return (
      <div className={clsx("GeoSearch", className)} style={style}>
        <MapInput
          className={clsx({
            "GeoSearch-Input__active": isFocused,
            "GeoSearch-Input__error": error,
          })}
          error={error}
          name={name}
          type="text"
          value={state.value}
          style={{
            width: "100%",
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={(event) => {
            const value = event.target.value;
            onStateChange((state) => ({
              ...state,
              value,
              showSuggestions: true,
            }));
          }}
          {...inputProps}
        />
        <div
          className={clsx("GeoSearch-DropDown", {
            "GeoSearch-DropDown__active": !isEmpty(getSuggestions()),
          })}
        >
          {getSuggestions().map((suggestion) => (
            <p
              key={suggestion.uuid}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                onStateChange(() => ({
                  value: suggestion.displayName,
                  showSuggestions: false,
                  suggestions: [],
                }));

                onSearch?.(suggestion.displayName);
              }}
            >
              {suggestion.displayName}
            </p>
          ))}
        </div>
      </div>
    );
  },
  true,
  ["suggest"],
);

export function geoSearchLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
