import { createElement, memo } from "react";
import type { FC, ReactNode } from "react";
import { ETypographyVariant } from "~/uikit/Typography/enums";
import { TYPOGRAPHY_THEMES } from "~/uikit/Typography/constants";
import type { TColor } from "~/uikit/Typography";
import { ETextColor } from "~/uikit";

type TProps = {
  as?: string;
  children?: ReactNode;
  color?: TColor;
  variant?: `${ETypographyVariant}`;
};

const TypographyComponent: FC<TProps> = ({
  as = "span",
  children,
  color = ETextColor.Dark,
  variant = ETypographyVariant.TextB3Regular,
}) => {
  const currentTheme = TYPOGRAPHY_THEMES({ color })[variant];

  return createElement(
    as,
    {
      className: currentTheme,
    },
    children,
  );
};

export const Typography = memo(TypographyComponent);
