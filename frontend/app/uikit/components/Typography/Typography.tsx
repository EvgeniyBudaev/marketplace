import { createElement, memo } from "react";
import type { FC, ReactNode } from "react";
import { ETypographyVariant } from "#app/uikit/components/Typography/enums";
import { TYPOGRAPHY_THEMES } from "#app/uikit/components/Typography/constants";
import { ETextColor } from "#app/uikit";
import type { TColor } from "#app/uikit";

type TProps = {
  as?: string;
  children?: ReactNode;
  color?: TColor;
  dataTestId?: string;
  variant?: `${ETypographyVariant}`;
};

const TypographyComponent: FC<TProps> = ({
  as = "span",
  children,
  color = ETextColor.Dark,
  dataTestId = "uikit__typography",
  variant = ETypographyVariant.TextB3Regular,
}) => {
  const currentTheme = TYPOGRAPHY_THEMES({ color })[variant];

  return createElement(
    as,
    {
      className: currentTheme,
      "data-testid": dataTestId,
    },
    children
  );
};

export const Typography = memo(TypographyComponent);
