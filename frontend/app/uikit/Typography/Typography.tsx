import { createElement, memo } from "react";
import type { FC, ReactNode } from "react";
import { ETypographyVariant } from "~/uikit/Typography/enums";
import { TYPOGRAPHY_THEMES } from "~/uikit/Typography/constants";

type TProps = {
  as?: string;
  children?: ReactNode;
  variant?: `${ETypographyVariant}`;
};

const TypographyComponent: FC<TProps> = ({
  as = "span",
  children,
  variant = ETypographyVariant.TextH1Bold,
}) => {
  const currentTheme = TYPOGRAPHY_THEMES()[variant];

  return createElement(
    as,
    {
      className: currentTheme,
    },
    children,
  );
};

export const Typography = memo(TypographyComponent);
