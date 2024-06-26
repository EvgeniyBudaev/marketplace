import clsx from "clsx";
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
  GetOptionLabel,
  MenuPosition,
  MenuPlacement,
} from "react-select";
import type { SelectComponents } from "react-select/dist/declarations/src/components";
import { selectStyles, ETheme } from "#app/uikit";
import type { TSelectOption, isSelectMultiType } from "#app/uikit";
import { generateUUID } from "#app/utils";
import styles from "./Select.css";

export type TSelectProps = {
  className?: string;
  components?: Partial<SelectComponents<any, any, GroupBase<any>>>;
  dataTestId?: string;
  defaultValue?: TSelectOption | TSelectOption[];
  getOptionLabel?: GetOptionLabel<TSelectOption | TSelectOption[]>;
  id?: string;
  instanceId?: string;
  isDisabled?: boolean;
  isMulti?: isSelectMultiType;
  menuPlacement?: MenuPlacement;
  menuPosition?: MenuPosition;
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?: (
    value: OnChangeValue<TSelectOption, isSelectMultiType>,
    action: ActionMeta<TSelectOption>
  ) => void;
  onFocus?: FocusEventHandler;
  options: TSelectOption[];
  placeholder?: string;
  styles?:
    | StylesConfig<TSelectOption, isSelectMultiType, GroupBase<TSelectOption>>
    | undefined;
  theme?: ETheme;
  value?: SingleValue<TSelectOption> | MultiValue<TSelectOption>;
};

const SelectComponent: FC<TSelectProps> = ({
  className,
  components,
  dataTestId = "uikit__select",
  defaultValue,
  getOptionLabel,
  id,
  instanceId,
  isDisabled = false,
  isMulti = false,
  menuPlacement,
  menuPosition,
  name,
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  styles,
  theme = ETheme.Light,
  value,
}) => {
  const uuid = generateUUID();

  return (
    <ReactSelect
      className={clsx("Select", className)}
      components={components}
      data-testid={dataTestId}
      defaultValue={defaultValue}
      getOptionLabel={getOptionLabel}
      id={id ? id : uuid}
      instanceId={instanceId ? instanceId : uuid}
      isDisabled={isDisabled}
      isMulti={isMulti}
      menuPlacement={menuPlacement}
      menuPosition={menuPosition}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      options={options}
      placeholder={placeholder}
      styles={!styles && theme ? selectStyles(theme) : styles}
      value={value}
    />
  );
};

export const Select = memo(SelectComponent);

export function selectLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
