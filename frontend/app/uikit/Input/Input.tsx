import {
    DetailedHTMLProps,
    ForwardedRef,
    HTMLAttributes,
    forwardRef,
    memo,
} from "react";
import clsx from "clsx";
import styles from "./Input.module.css";

export interface IInputProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLInputElement>,
        HTMLInputElement
        > {
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

const InputComponent = forwardRef(
    (
        { className, autoComplete, label, name, type, error, isFocused, isRequired, onChange, ...rest }: IInputProps,
        ref: ForwardedRef<HTMLInputElement>
    ): JSX.Element => {
        return (
            <>
                <div
                    className={clsx("FormField", className, {
                        "FormField__active": isFocused,
                    })}
                >
                    <div
                        className={clsx("Input", {
                            "Input__active": isFocused,
                            "Input__error": error,
                        })}
                    >
                        <input
                            className={clsx(className, "InputComponent", {
                                "InputComponent__error": error,
                            })}
                            autoComplete={autoComplete}
                            name={name}
                            type={type}
                            ref={ref}
                            onChange={onChange}
                            {...rest}
                        />
                        {error && <div className="ErrorMessage">{error}</div>}
                    </div>

                    <label className="FormField_Label" htmlFor={name}>
                        {label}
                        {isRequired && (
                            <span className="FormField_LabelRequired"> *</span>
                        )}
                    </label>

                </div>
            </>
        );
    }
);

InputComponent.displayName = "InputComponent";

export const Input = memo(InputComponent);

export function inputLinks() {
    return [{ rel: "stylesheet", href: styles }];
}

