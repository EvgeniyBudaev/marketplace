import { GroupBase, StylesConfig } from "react-select";
import { TSelectVariants } from "~/pages/Catalog/Sorting/types";
import { VARIANTS } from "~/pages/Catalog/Sorting/selectVariants";
import { ISelectOption } from "~/uikit";

export const selectStyles = (
  variant: TSelectVariants = "primary",
): StylesConfig<ISelectOption, false, GroupBase<ISelectOption>> | undefined => {
  const style = VARIANTS[variant];

  return {
    control: (provided, state) => ({
      ...provided,
      background: style.control.background,
      border: style.control.border,
      borderRadius: style.control.borderRadius,
      cursor: style.control.cursor,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: style.singleValue.color,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: style.option.backgroundColor,
      borderRadius: style.option.borderRadius,
      color: state.isFocused || state.isSelected ? style.option.color : "",
      cursor: style.option.cursor,
      ":active": style.option[":active"],
      ":hover": style.option[":hover"],
    }),
  };
};
