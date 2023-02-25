import { memo } from "react";
import type { FC, FocusEventHandler } from "react";
import { default as ReactSelect } from "react-select";
import type {
  ActionMeta,
  GroupBase,
  StylesConfig,
  OnChangeValue,
  MultiValue,
  SingleValue,
} from "react-select";
import { useHydrated } from "remix-utils";
import clsx from "clsx";
import { selectStyles } from "~/uikit";
import type { TSelectOption, TSelectVariants, isSelectMultiType } from "~/uikit";
import { generateUUID } from "~/utils";
import styles from "./Select.module.css";

export type TSelectProps = {
  className?: string;
  defaultValue?: TSelectOption | TSelectOption[];
  id?: string;
  instanceId?: string;
  isMulti?: isSelectMultiType;
  name?: string;
  options: TSelectOption[];
  styles?: StylesConfig<TSelectOption, isSelectMultiType, GroupBase<TSelectOption>> | undefined;
  theme?: TSelectVariants;
  value?: SingleValue<TSelectOption> | MultiValue<TSelectOption>;
  onBlur?: FocusEventHandler;
  onChange?: (
    value: OnChangeValue<TSelectOption, isSelectMultiType>,
    action: ActionMeta<TSelectOption>,
  ) => void;
  onFocus?: FocusEventHandler;
};

const SelectComponent: FC<TSelectProps> = ({
  className,
  defaultValue,
  id,
  instanceId,
  isMulti = false,
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
      isMulti={isMulti}
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
