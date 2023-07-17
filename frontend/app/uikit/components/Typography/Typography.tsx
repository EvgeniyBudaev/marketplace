import { createElement, memo } from "react";
import type { FC, ReactNode } from "react";
import { ETypographyVariant } from "~/uikit/components/Typography/enums";
import { TYPOGRAPHY_THEMES } from "~/uikit/components/Typography/constants";
import type { TColor } from "~/uikit/components/Typography/index";
import { ETextColor } from "~/uikit";

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
    children,
  );
};

export const Typography = memo(TypographyComponent);
