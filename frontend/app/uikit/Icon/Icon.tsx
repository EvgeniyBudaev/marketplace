import { DOMAttributes, memo, useEffect, useRef } from "react";
import type { FC } from "react";
import clsx from "clsx";
import { formatToStringWithPx } from "~/uikit/utils";
import { IconType, iconTypes } from "./IconType";
import styles from "./Icon.module.css";

const getIcon = (type: string) => iconTypes.get(type);

interface IProps extends DOMAttributes<HTMLSpanElement> {
  className?: string;
  height?: number;
  size?: number;
  type: IconType;
  width?: number;
}

const IconComponent: FC<IProps> = ({ className, height, width, size, type, ...rest }) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iconRef.current) {
      if (size && !height && !width) {
        iconRef.current.style.setProperty("--icon-height", formatToStringWithPx(size));
        iconRef.current.style.setProperty("--icon-width", formatToStringWithPx(size));
      } else if (!size && height && width) {
        iconRef.current.style.setProperty("--icon-height", formatToStringWithPx(height));
        iconRef.current.style.setProperty("--icon-width", formatToStringWithPx(width));
      }
    }
  }, [height, size, width]);

  return (
    <div className={clsx("Icon", className)} ref={iconRef} {...rest}>
      {getIcon(type)}
    </div>
  );
};

export const Icon = memo(IconComponent);

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
