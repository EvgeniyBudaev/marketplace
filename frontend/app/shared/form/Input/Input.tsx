import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import {Input as InputUi} from '~/uikit';
import type { IInputProps as TInputPropsUi } from '~/uikit';

export type TInputProps = TInputPropsUi & {
    name: string;
    normalize?: (value: string) => string;
    numeric?: boolean;
};

const InputComponent: React.VFC<TInputProps> = ({
                                                    defaultValue = '',
                                                    name,
                                                    normalize,
                                                    numeric,
                                                    ...props
                                                }) => {
    const { control } = useFormContext();
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue,
    });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        (event) => {
            console.log(event.target.value);

            // if (typeof normalize === 'function') {
            //     event.target.value = normalize(event.target.value);
            // }

            // if (numeric) {
            //     event.target.value = event.target.value.replace(',', '.');
            // }

            field.onChange(event.target.value);
        },
        [field],
    );

    return (
        <InputUi
            {...props}
            ref={field.ref}
            //fieldError={error?.message ? translateRawData(t, error.message) : undefined}
            //hasError={!!error}
            name={field.name}
            onBlur={field.onBlur}
            onChange={onChange}
            value={field.value}
        />
    );
};

export const Input = React.memo(InputComponent);
