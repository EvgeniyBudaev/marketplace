import { forwardRef, memo, useState } from "react";
import type { DetailedHTMLProps, ForwardedRef, HTMLAttributes, FocusEvent } from "react";
import clsx from "clsx";
import { ETypographyVariant, FadeIn, Typography } from "~/uikit";
import styles from "./Input.module.css";

export interface IInputProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  autoComplete?: string;
  label?: string;
  name?: string;
  type?: string;
  error?: string;
  value?: string;
  isFocused?: boolean;
  isRequired?: boolean;
}

const InputComponent = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      autoComplete,
      label,
      name,
      type,
      error,
      isRequired,
      onBlur,
      onChange,
      onFocus,
      ...rest
    }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const [isFocused, setIsFocused] = useState<boolean | undefined>();

    const onBlurCallback = (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.value !== "") {
        setIsFocused(true);
      } else {
        setIsFocused(false);
      }

      if (onBlur) {
        onBlur(event);
      }
    };

    const onFocusCallback = (event: FocusEvent<HTMLInputElement>) => {
      if (!isFocused) {
        setIsFocused(true);
      }

      if (onFocus) {
        onFocus(event);
      }
    };

    return (
      <div
        className={clsx("InputField", className, {
          InputField__active: isFocused,
        })}
      >
        <div
          className={clsx("InputField-Inner", {
            "InputField-Inner__active": isFocused,
            "InputField-Inner__error": error,
          })}
        >
          <input
            className={clsx(className, "Input", {
              Input__active: isFocused,
              Input__error: error,
            })}
            autoComplete={autoComplete}
            name={name}
            type={type}
            ref={ref}
            onChange={onChange}
            onFocus={onFocusCallback}
            onBlur={onBlurCallback}
            {...rest}
          />
        </div>

        {error && (
          <div className="InputField-ErrorField">
            <FadeIn>
              <Typography variant={ETypographyVariant.TextB3Regular}>{error}</Typography>
            </FadeIn>
          </div>
        )}

        <label className="InputField-Label" htmlFor={name}>
          <Typography variant={ETypographyVariant.TextB3Regular}>{label}</Typography>
          {isRequired && <span className="InputField-LabelRequired"> *</span>}
        </label>
      </div>
    );
  },
);

InputComponent.displayName = "InputComponent";

export const Input = memo(InputComponent);

export function inputLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
