import type { GroupBase, StylesConfig } from "react-select";
import { VARIANTS, ETheme } from "~/uikit";
import type { TSelectOption, isSelectMultiType } from "~/uikit";

export const selectStyles = (
  variant = ETheme.Light,
): StylesConfig<TSelectOption, isSelectMultiType, GroupBase<TSelectOption>> | undefined => {
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
      backgroundColor: state.isSelected
        ? style.option[":active"].backgroundColor
        : style.option.backgroundColor,
      borderRadius: style.option.borderRadius,
      color: state.isSelected ? style.option[":active"].color : style.option.color,
      cursor: style.option.cursor,
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
