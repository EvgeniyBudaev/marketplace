import React, { DOMAttributes, useRef } from "react";
import clsx from "clsx";
import classes from "./Button.module.scss";

export type ButtonType = "button" | "reset" | "submit";

export interface IProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  type?: ButtonType;
  isDisabled?: boolean;
  onClick?: (event?: React.MouseEvent) => void;
}

export const Button: React.FC<IProps> = ({
  className,
  children,
  type = "button",
  isDisabled = false,
  onClick,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const target = event.target as HTMLButtonElement;
      const x = event.clientX - target.offsetLeft;
      const y = event.clientY - target.offsetTop;

      const ripples = document.createElement("span");
      ripples.style.left = x + "px";
      ripples.style.top = y + "px";
      if (buttonRef.current) {
        buttonRef.current.appendChild(ripples);
      }

      setTimeout(() => {
        ripples.remove();
      }, 1000);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={clsx(classes.Button, className, {
        [classes.Button__disabled]: isDisabled,
      })}
      disabled={isDisabled}
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
};
