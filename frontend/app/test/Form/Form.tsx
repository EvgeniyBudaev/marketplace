import * as React from 'react';
import { Form as RemixForm } from 'remix-forms';
import type { FormProps as RemixFormProps } from 'remix-forms';
import type z from 'zod';

import { Label } from '~/test';

import { FormRenderField } from './FormRenderField';
import type { TChildren } from './types';
import {Input, Select} from "~/uikit";

export type TFormProps<Schema extends z.SomeZodObject> = Omit<
  RemixFormProps<Schema>,
  'children'
> & {
  children?: TChildren<Schema>;
};

const FormComponent = <Schema extends z.SomeZodObject>(props: TFormProps<Schema>) => {
  return (
    <RemixForm<Schema>
      inputComponent={Input as any}
      labelComponent={Label}
      renderField={FormRenderField}
      selectComponent={Select as RemixFormProps<Schema>['selectComponent']}
      {...props}
    />
  );
};

export const Form = React.memo(FormComponent) as typeof FormComponent;
