import clsx from "clsx";
import { EHeaderLineVariant } from "~/components/Layout/Header/HeaderLine/enums";

export const HEADER_LINE_THEMES = () => {
  return {
    [EHeaderLineVariant.Light]: clsx("HeaderLine"),
    [EHeaderLineVariant.Dark]: clsx("HeaderLine HeaderLine__dark"),
  };
};
