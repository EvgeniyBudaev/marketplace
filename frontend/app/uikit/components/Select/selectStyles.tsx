import type { GroupBase, StylesConfig } from "react-select";
import { VARIANTS, ETheme } from "#app/uikit";
import type { TSelectOption, isSelectMultiType } from "#app/uikit";

export const selectStyles = (
  variant = ETheme.Light
):
  | StylesConfig<TSelectOption, isSelectMultiType, GroupBase<TSelectOption>>
  | undefined => {
  const style = VARIANTS[variant];

  return {
    control: (provided) => ({
      ...provided,
      background: style.control.background,
      border: style.control.border,
      borderRadius: style.control.borderRadius,
      cursor: style.control.cursor,
      transition: style.control.transition,
      ":active": style.control[":active"],
      ":hover": style.control[":hover"],
    }),
    singleValue: (provided) => ({
      ...provided,
      color: style.singleValue.color,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? (style.option &&
            style.option[":active"] &&
            style.option[":active"].backgroundColor) ||
          style.option.backgroundColor
        : (style.option && style.option.backgroundColor) ||
          style.option.backgroundColor,
      borderRadius: style.option.borderRadius,
      color: state.isSelected
        ? (style.option &&
            style.option[":active"] &&
            style.option[":active"].color) ||
          style.option.color
        : (style.option && style.option.color) || style.option.color,
      cursor: style.option.cursor,
      transition: style.control.transition,
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
