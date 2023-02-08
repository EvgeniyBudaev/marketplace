import * as React from "react";
import type { FormProps as RemixFormProps, FormSchema } from "remix-forms";
import { Label } from "~/test";
import { FormRenderField } from "./FormRenderField";
import { Input, Select } from "~/uikit";
import { createForm } from "remix-forms";
import {
  Form as FrameworkForm,
  useActionData,
  useSubmit,
  useTransition as useNavigation,
} from "@remix-run/react";

const RemixForm = createForm({ component: FrameworkForm, useNavigation, useSubmit, useActionData });

function FormComponent<Schema extends FormSchema>(props: RemixFormProps<Schema>) {
  return (
    <RemixForm<Schema>
      inputComponent={Input as any}
      labelComponent={Label}
      renderField={FormRenderField}
      {...props}
      selectComponent={Select as RemixFormProps<Schema>["selectComponent"]}
    />
  );
}

export const Form = React.memo(FormComponent) as typeof FormComponent;
