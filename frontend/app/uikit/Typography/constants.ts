import clsx from "clsx";
import { ETypographyVariant } from "~/uikit/Typography/enums";
import styles from "./Typography.module.css";

export const TYPOGRAPHY_THEMES = () => {
  return {
    [ETypographyVariant.TextH1Bold]: clsx("Typography-text-h1 Typography-text-h1__bold"),
    [ETypographyVariant.TextH2Medium]: clsx("Typography-text-h2 Typography-text-h2__medium"),
    [ETypographyVariant.TextH3Medium]: clsx("Typography-text-h3 Typography-text-h3__medium"),
    [ETypographyVariant.TextH4Medium]: clsx("Typography-text-h4 Typography-text-h4__medium"),
    [ETypographyVariant.TextH5Medium]: clsx("Typography-text-h5 Typography-text-h5__medium"),
    [ETypographyVariant.TextH5Bold]: clsx("Typography-text-h5 Typography-text-h5__bold"),
    [ETypographyVariant.TextH6Bold]: clsx("Typography-text-h6 Typography-text-h6__bold"),
    [ETypographyVariant.TextB2Bold]: clsx("Typography-text-b3 Typography-text-b2__bold"),
    [ETypographyVariant.TextB3Bold]: clsx("Typography-text-b3 Typography-text-b3__bold"),
    [ETypographyVariant.TextB3Regular]: clsx("Typography-text-b3 Typography-text-b3__regular"),
    [ETypographyVariant.TextB4Regular]: clsx("Typography-text-b4 Typography-text-b4__regular"),
  };
};

export function typographyLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
