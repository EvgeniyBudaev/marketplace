import React, { DOMAttributes, useEffect, useRef } from "react";
import clsx from "clsx";
import { setAtToStringAndPx } from "../../utils";
import { IconType, iconTypes } from "./IconType";
import classes from "./Icon.module.scss";

const getIcon = (type: string) => iconTypes.get(type);

export interface IProps extends DOMAttributes<HTMLSpanElement> {
  className?: string;
  height?: number;
  size?: number;
  type: IconType;
  width?: number;
}

export const Icon: React.FC<IProps> = ({
  className,
  height,
  width,
  size,
  type,
  ...rest
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iconRef.current) {
      if (size && !height && !width) {
        iconRef.current.style.setProperty(
          "--icon-height",
          setAtToStringAndPx(size)
        );
        iconRef.current.style.setProperty(
          "--icon-width",
          setAtToStringAndPx(size)
        );
      } else if (!size && height && width) {
        iconRef.current.style.setProperty(
          "--icon-height",
          setAtToStringAndPx(height)
        );
        iconRef.current.style.setProperty(
          "--icon-width",
          setAtToStringAndPx(width)
        );
      }
    }
  }, [height, size, width]);

  return (
    <div className={clsx(classes.Icon, className)} ref={iconRef} {...rest}>
      {getIcon(type)}
    </div>
  );
};
