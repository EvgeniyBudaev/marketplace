import type { GroupBase, StylesConfig } from "react-select";
import { VARIANTS } from "~/uikit";
import type { TSelectOption, TSelectVariants } from "~/uikit";

export const selectStyles = (
  variant: TSelectVariants = "primary",
): StylesConfig<TSelectOption, false, GroupBase<TSelectOption>> | undefined => {
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
    menu: (provided) => ({
      ...provided,
      zIndex: style.menu.zIndex,
    }),
    menuList: (provided) => ({
      ...provided,
    }),
    menuPortal: (provided) => ({
      ...provided,
    }),
  };
};
