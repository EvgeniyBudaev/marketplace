import clsx from "clsx";
import { memo, useRef } from "react";
import type { FC, MouseEvent, DOMAttributes } from "react";
import type { TButton } from "~/uikit";
import styles from "./Button.css";

export interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  dataTestId?: string;
  type?: TButton;
  isDisabled?: boolean;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonComponent: FC<IButtonProps> = ({
  className,
  children,
  dataTestId = "uikit__button",
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
      data-testid={dataTestId}
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
