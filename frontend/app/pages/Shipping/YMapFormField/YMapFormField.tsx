import { useCallback, useEffect } from "react";
import type { Dispatch, FC, FocusEvent, SetStateAction } from "react";
import { useController, useFormContext } from "react-hook-form";
import clsx from "clsx";
import GeoSearch from "~/pages/Shipping/YMap/GeoSearch/GeoSearch";
import type { TGeoSearchSuggestion } from "~/pages/Shipping/YMap/GeoSearch";
import type { TPickMapState } from "~/pages/Shipping/YMap/PickMap";
import { ETypographyVariant, Typography } from "~/uikit";
import styles from "./YMapFormField.module.css";

type FormFieldYMapType = "text";

type TProps = {
  className?: string;
  defaultValue?: string;
  label?: string;
  mapState?: TPickMapState;
  name: string;
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
  defaultValue = "",
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
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  useEffect(() => {
    onChange(searchState.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState]);

  const onChange = useCallback(
    (value: string) => {
      field.onChange(value);
    },
    [field],
  );

  return (
    <div
      className={clsx("YMapFormField", className, {
        YMapFormField__active: isFocused,
      })}
    >
      <label className="YMapFormField-Label" htmlFor={name}>
        <Typography
          variant={!isFocused ? ETypographyVariant.TextB3Regular : ETypographyVariant.TextB4Regular}
        >
          {label}
        </Typography>
      </label>
      {type === "text" && (
        <>
          <GeoSearch
            className={clsx({
              "YMapFormField-Input__active": isFocused,
              "YMapFormField-Input__error": error,
            })}
            error={error?.message}
            name={field.name}
            state={searchState}
            isFocused={isFocused}
            onBlur={onBlur}
            onFocus={onFocus}
            onStateChange={onStateChange}
            onSearch={onSearch}
          />
          {error && <div className="YMapFormField-ErrorMessage">{error.message}</div>}
        </>
      )}
    </div>
  );
};

export function yMapFormFieldLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
