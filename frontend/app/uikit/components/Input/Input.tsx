import { forwardRef, memo, useState } from "react";
import type {
  DetailedHTMLProps,
  ForwardedRef,
  HTMLAttributes,
  FocusEvent,
} from "react";
import clsx from "clsx";
import { ETypographyVariant, FadeIn, Typography } from "#app/uikit";
import styles from "./Input.css";

export interface IInputProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  autoComplete?: string;
  className?: string;
  dataTestId?: string;
  error?: string;
  hidden?: boolean;
  isFocused?: boolean;
  isRequired?: boolean;
  label?: string;
  name?: string;
  type?: string;
  value?: string;
}

const InputComponent = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      autoComplete,
      className,
      dataTestId = "uikit__input",
      error,
      hidden,
      isFocused: isInputFocused,
      isRequired,
      label,
      name,
      type,
      onBlur,
      onChange,
      onFocus,
      ...rest
    }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const [isFocused, setIsFocused] = useState<boolean | undefined>(
      isInputFocused
    );

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
        data-testid={dataTestId}
      >
        <div
          className={clsx("InputField-Inner", {
            "InputField-Inner__active": isFocused,
            "InputField-Inner__error": error,
          })}
        >
          <input
            {...rest}
            className={clsx(className, "Input", {
              Input__active: isFocused,
              Input__error: error,
            })}
            autoComplete={autoComplete}
            hidden={hidden}
            name={name}
            type={type}
            ref={ref}
            onChange={onChange}
            onFocus={onFocusCallback}
            onBlur={onBlurCallback}
          />
        </div>

        {error && (
          <div className="InputField-ErrorField">
            <FadeIn>
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {error}
              </Typography>
            </FadeIn>
          </div>
        )}

        <label className="InputField-Label" htmlFor={name}>
          <Typography
            variant={
              !isFocused
                ? ETypographyVariant.TextB3Regular
                : ETypographyVariant.TextB4Regular
            }
          >
            {label}
          </Typography>
          {isRequired && <span className="InputField-LabelRequired"> *</span>}
        </label>
      </div>
    );
  }
);

InputComponent.displayName = "InputComponent";

export const Input = memo(InputComponent);

export function inputLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
