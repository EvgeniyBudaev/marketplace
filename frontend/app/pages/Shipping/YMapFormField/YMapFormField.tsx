import React, { Dispatch, SetStateAction } from "react";
import type { FC, FocusEvent } from "react";
import clsx from "clsx";
import GeoSearch from "~/pages/Shipping/YMap/GeoSearch/GeoSearch";
import { TGeoSearchSuggestion } from "~/pages/Shipping/YMap/GeoSearch";
import { TPickMapState } from "~/pages/Shipping/YMap/PickMap";
import styles from "./YMapFormField.module.css";

type FormFieldYMapType = "text";

type TProps = {
  className?: string;
  error?: string;
  label?: string;
  mapState?: TPickMapState;
  name?: string;
  searchState: {
    value: string;
    suggestions: TGeoSearchSuggestion[];
    showSuggestions: boolean;
  };
  type: FormFieldYMapType;
  isFocused?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => void;
  onStateChange: Dispatch<
    SetStateAction<{
      value: string;
      suggestions: TGeoSearchSuggestion[];
      showSuggestions: boolean;
    }>
  >;
  onSearch?: Dispatch<SetStateAction<TPickMapState>>;
};

export const YMapFormField: FC<TProps> = ({
  className,
  error,
  label,
  name,
  searchState,
  type,
  isFocused,
  onBlur,
  onFocus,
  onStateChange,
  onSearch,
}) => {
  return (
    <div
      className={clsx("YMapFormField", className, {
        YMapFormField__active: isFocused,
      })}
    >
      <label className="YMapFormField-Label" htmlFor={name}>
        {label}
      </label>
      {type === "text" && (
        <>
          <GeoSearch
            className={clsx({
              "YMapFormField-Input__active": isFocused,
              "YMapFormField-Input__error": error,
            })}
            error={error}
            name={name}
            state={searchState}
            isFocused={isFocused}
            onBlur={onBlur}
            onFocus={onFocus}
            onStateChange={onStateChange}
            onSearch={onSearch}
          />
          {error && <div className="YMapFormField-ErrorMessage">{error}</div>}
        </>
      )}
    </div>
  );
};

export function yMapFormFieldLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
