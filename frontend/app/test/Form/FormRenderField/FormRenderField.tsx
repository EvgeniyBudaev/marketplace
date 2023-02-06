import * as React from 'react';
import type { RenderFieldProps } from 'remix-forms';
import type z from 'zod';
import type { TExtendRenderFieldProps } from './types';

export type TFormRenderFieldProps<Schema extends z.SomeZodObject> = TExtendRenderFieldProps &
  Omit<RenderFieldProps<Schema>, 'defaultValue' | 'options' | 'value'>;

export function FormRenderField<Schema extends z.SomeZodObject>({
  Field,
  ...renderFieldProps
}: TFormRenderFieldProps<Schema>): React.ReactElement {
  return (
    <Field {...renderFieldProps}>
      {({ SmartInput, Errors }) => (
        <>
          <SmartInput {...renderFieldProps} />
          <Errors />
        </>
      )}
    </Field>
  );
}
