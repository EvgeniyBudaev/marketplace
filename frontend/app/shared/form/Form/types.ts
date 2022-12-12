import type { FormEventHandler, ReactNode } from "react";
import type { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import type { FetcherWithComponents, FormMethod } from "@remix-run/react";
import type { TUseInitFormReturn } from "./hooks";

type TChildrenFunction<T extends FieldValues> = (
  data: UseFormReturn<T, any>,
) => ReactNode | ReactNode[];

export type TFormComponentProps<T extends FieldValues> = {
  authenticity?: boolean;
  children?: ReactNode | ReactNode[] | TChildrenFunction<T>;
  className?: string;
  form: TUseInitFormReturn<T>;
  handleSubmit?: (
    data: FieldValues,
    options: { fetcher: FetcherWithComponents<FieldValues> },
  ) => void;
  id?: string;
  method?: FormMethod;
  noValidate?: boolean;
  onChange?: FormEventHandler<HTMLFormElement>;
} & UseFormProps<T>;
