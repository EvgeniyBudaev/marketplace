import { memo } from "react";
import type { FC, FocusEventHandler } from "react";
import { default as ReactSelect } from "react-select";
import type { ActionMeta, GroupBase, StylesConfig } from "react-select";
import { useHydrated } from "remix-utils";
import clsx from "clsx";
import { selectStyles } from "~/uikit";
import type { TSelectOption, TSelectVariants } from "~/uikit";
import { generateUUID } from "~/utils";
import styles from "./Select.module.css";

export type TSelectProps = {
  className?: string;
  defaultValue?: TSelectOption;
  id?: string;
  instanceId?: string;
  name?: string;
  options: TSelectOption[];
  styles?: StylesConfig<TSelectOption, false, GroupBase<TSelectOption>> | undefined;
  theme?: TSelectVariants;
  value?: TSelectOption;
  onBlur?: FocusEventHandler;
  onChange?:
    | (((value: TSelectOption | null, actionMeta: ActionMeta<TSelectOption>) => void) &
        ((value: TSelectOption | null, action: ActionMeta<TSelectOption>) => void))
    | undefined;
  onFocus?: FocusEventHandler;
};

const SelectComponent: FC<TSelectProps> = ({
  className,
  defaultValue,
  id,
  instanceId,
  name,
  options,
  styles,
  theme,
  value,
  onBlur,
  onChange,
  onFocus,
}) => {
  const uuid = generateUUID();

  const isHydrated = useHydrated();
  return isHydrated ? (
    <ReactSelect
      className={clsx("Select", className)}
      defaultValue={defaultValue}
      id={id ? id : uuid}
      instanceId={instanceId ? instanceId : uuid}
      name={name}
      options={options}
      styles={!styles && theme ? selectStyles(theme) : styles}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
  ) : null;
};

export const Select = memo(SelectComponent);

export function selectLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
