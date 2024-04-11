import clsx from "clsx";
import { EColorType } from "#app/uikit";
import type { TColor } from "#app/uikit";
import { ETypographyVariant } from "#app/uikit/components/Typography/index";
import styles from "./Typography.css";

type TThemesOptions = {
  color: TColor;
};

export const TYPOGRAPHY_THEMES = (options: TThemesOptions) => {
  const mainStyles = clsx(`${EColorType.Text}-${options?.color}`);

  return {
    [ETypographyVariant.TextH1Bold]: clsx(
      "Typography text-h1 text-bold",
      mainStyles
    ),
    [ETypographyVariant.TextH1Medium]: clsx(
      "Typography text-h1 text-medium",
      mainStyles
    ),
    [ETypographyVariant.TextH1Regular]: clsx(
      "Typography text-h1 text-regular",
      mainStyles
    ),
    [ETypographyVariant.TextH2Bold]: clsx(
      "Typography text-h2 text-bold",
      mainStyles
    ),
    [ETypographyVariant.TextH2Medium]: clsx(
      "Typography text-h2 text-medium",
      mainStyles
    ),
    [ETypographyVariant.TextH2Regular]: clsx(
      "Typography text-h2 text-regular",
      mainStyles
    ),
    [ETypographyVariant.TextH3Bold]: clsx(
      "Typography text-h3 text-bold",
      mainStyles
    ),
    [ETypographyVariant.TextH3Medium]: clsx(
      "Typography text-h3 text-medium",
      mainStyles
    ),
    [ETypographyVariant.TextH3Regular]: clsx(
      "Typography text-h3 text-regular",
      mainStyles
    ),
    [ETypographyVariant.TextH4Bold]: clsx(
      "Typography text-h4 text-bold",
      mainStyles
    ),
    [ETypographyVariant.TextH4Medium]: clsx(
      "Typography text-h4 text-medium",
      mainStyles
    ),
    [ETypographyVariant.TextH4Regular]: clsx(
      "Typography text-h4 text-regular",
      mainStyles
    ),
    [ETypographyVariant.TextH5Bold]: clsx(
      "Typography text-h5 text-bold",
      mainStyles
    ),
    [ETypographyVariant.TextH5Medium]: clsx(
      "Typography text-h5 text-medium",
      mainStyles
    ),
    [ETypographyVariant.TextH5Regular]: clsx(
      "Typography text-h5 text-regular",
      mainStyles
    ),
    [ETypographyVariant.TextH6Bold]: clsx(
      "Typography text-h6 text-bold",
      mainStyles
    ),
    [ETypographyVariant.TextH6Medium]: clsx(
      "Typography text-h6 text-medium",
      mainStyles
    ),
    [ETypographyVariant.TextH6Regular]: clsx(
      "Typography text-h6 text-regular",
      mainStyles
    ),
    [ETypographyVariant.TextB2Bold]: clsx(
      "Typography text-b2 text-bold",
      mainStyles
    ),
    [ETypographyVariant.TextB2SemiBold]: clsx(
      "Typography text-b2 text-semiBold",
      mainStyles
    ),
    [ETypographyVariant.TextB2Medium]: clsx(
      "Typography text-b2 text-medium",
      mainStyles
    ),
    [ETypographyVariant.TextB2Regular]: clsx(
      "Typography text-b2 text-regular",
      mainStyles
    ),
    [ETypographyVariant.TextB3Bold]: clsx(
      "Typography text-b3 text-bold",
      mainStyles
    ),
    [ETypographyVariant.TextB3Medium]: clsx(
      "Typography text-b3 text-medium",
      mainStyles
    ),
    [ETypographyVariant.TextB3Regular]: clsx(
      "Typography text-b3 text-regular",
      mainStyles
    ),
    [ETypographyVariant.TextB4Bold]: clsx(
      "Typography text-b4 text-bold",
      mainStyles
    ),
    [ETypographyVariant.TextB4Medium]: clsx(
      "Typography text-b4 text-medium",
      mainStyles
    ),
    [ETypographyVariant.TextB4Regular]: clsx(
      "Typography text-b4 text-regular",
      mainStyles
    ),
  };
};

export function typographyLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
