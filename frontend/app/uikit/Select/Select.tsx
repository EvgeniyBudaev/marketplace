import { FocusEventHandler, memo } from "react";
import type { FC } from "react";
import { ActionMeta, default as ReactSelect, GroupBase, StylesConfig } from "react-select";
import { useHydrated } from "remix-utils";
import clsx from "clsx";
import styles from "./Select.module.css";

export interface ISelectOption {
  value: string;
  label: string;
}

type TProps = {
  className?: string;
  id?: string;
  instanceId?: string;
  options: ISelectOption[];
  styles?: StylesConfig<ISelectOption, false, GroupBase<ISelectOption>> | undefined;
  value: ISelectOption;
  onBlur?: FocusEventHandler;
  onChange?:
    | (((value: ISelectOption | null, actionMeta: ActionMeta<ISelectOption>) => void) &
        ((value: ISelectOption | null, action: ActionMeta<ISelectOption>) => void))
    | undefined;
  onFocus?: FocusEventHandler;
};

const SelectComponent: FC<TProps> = ({
  className,
  id,
  instanceId,
  options,
  styles,
  value,
  onBlur,
  onChange,
  onFocus,
}) => {
  const isHydrated = useHydrated();
  return isHydrated ? (
    <ReactSelect
      className={clsx("Select", className)}
      id={id}
      instanceId={instanceId}
      options={options}
      styles={styles}
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
