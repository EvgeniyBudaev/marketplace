import { memo } from "react";
import type { FC, FocusEventHandler } from "react";
import { default as ReactSelect } from "react-select";
import type { ActionMeta, GroupBase, StylesConfig } from "react-select";
import { useHydrated } from "remix-utils";
import clsx from "clsx";
import { selectStyles } from "~/uikit";
import { TSelectVariants } from "~/uikit/Select";
import { generateUUID } from "~/utils";
import styles from "./Select.module.css";

export interface ISelectOption {
  value: string;
  label: string;
}

export type TSelectProps = {
  className?: string;
  defaultValue?: ISelectOption;
  id?: string;
  instanceId?: string;
  name?: string;
  options: ISelectOption[];
  styles?: StylesConfig<ISelectOption, false, GroupBase<ISelectOption>> | undefined;
  theme?: TSelectVariants;
  value?: ISelectOption;
  onBlur?: FocusEventHandler;
  onChange?:
    | (((value: ISelectOption | null, actionMeta: ActionMeta<ISelectOption>) => void) &
        ((value: ISelectOption | null, action: ActionMeta<ISelectOption>) => void))
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
