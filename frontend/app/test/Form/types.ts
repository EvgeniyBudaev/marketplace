import type { UseFormReturn } from "react-hook-form";
import type { FieldProps } from "remix-forms/lib/createField";
import type z from "zod";
import type { TExtendRenderFieldProps } from "./FormRenderField";

export type TFormFieldComponent<Schema extends z.SomeZodObject> = React.ForwardRefExoticComponent<
  Omit<FieldProps<Schema>, "defaultValue" | "options" | "value"> &
    React.RefAttributes<any> &
    TExtendRenderFieldProps
>;

export type TChildren<Schema extends z.SomeZodObject> = (
  helpers: {
    Field: TFormFieldComponent<Schema>;
    Errors: any;
    Error: any;
    Button: React.ComponentType<JSX.IntrinsicElements["button"]> | string;
  } & UseFormReturn<z.infer<Schema>, any>,
) => React.ReactNode;
