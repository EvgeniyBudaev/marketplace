import { CSSProperties } from "react";
import type { ChangeEventHandler, FC, FocusEvent } from "react";
import clsx from "clsx";
import styles from "./MapInput.module.css";

type TProps = {
  className?: string;
  error?: string;
  name?: string;
  style?: CSSProperties;
  type: string;
  value: string;
  onBlur?: (event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const MapInput: FC<TProps> = ({
  className,
  error,
  name,
  style,
  type,
  value,
  onBlur,
  onChange,
  onFocus,
  ...inputProps
}) => {
  return (
    <>
      <input
        className={clsx(className, "MapInput", {
          MapInput__error: error,
        })}
        autoComplete="off"
        name={name}
        style={style}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        {...inputProps}
      />
    </>
  );
};

export function mapInputLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
