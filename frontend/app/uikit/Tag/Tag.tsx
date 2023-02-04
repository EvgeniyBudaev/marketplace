import { memo } from "react";
import type { FC } from "react";
import clsx from "clsx";
import { ETypographyVariant, Typography } from "~/uikit";
import styles from "./Tag.module.css";

type TProps = {
  className?: string;
  title?: string;
};

const Component: FC<TProps> = ({ className, title }) => {
  return (
    <div className={clsx("Tag", className)}>
      <div className="Tag-Title">
        <Typography variant={ETypographyVariant.TextB4Regular}>{title}</Typography>
      </div>
    </div>
  );
};

export const Tag = memo(Component);

export function tagLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
