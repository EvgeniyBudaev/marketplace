import { memo } from "react";
import type { FC } from "react";
import clsx from "clsx";
import { ETypographyVariant, Typography } from "~/uikit";
import styles from "./Tag.css";

type TProps = {
  className?: string;
  dataTestId?: string;
  title?: string;
};

const TagComponent: FC<TProps> = ({ className, dataTestId = "uikit__tag", title }) => {
  return (
    <div className={clsx("Tag", className)} data-testid={dataTestId}>
      <div className="Tag-Title">
        <Typography variant={ETypographyVariant.TextB4Regular}>{title}</Typography>
      </div>
    </div>
  );
};

export const Tag = memo(TagComponent);

export function tagLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
