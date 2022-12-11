import { DOMAttributes, memo, useRef } from "react";
import type { FC, MouseEvent } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonType = "button" | "reset" | "submit";

export interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  type?: ButtonType;
  isDisabled?: boolean;
  onClick?: (event?: MouseEvent) => void;
}

const ButtonComponent: FC<IButtonProps> = ({
  className,
  children,
  type = "button",
  isDisabled = false,
  onClick,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event?: MouseEvent<HTMLButtonElement>) => {
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
      className={clsx("Button", className, {
        Button__disabled: isDisabled,
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

export const Button = memo(ButtonComponent);

export function buttonLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
