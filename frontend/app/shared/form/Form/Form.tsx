import {memo, useCallback, useMemo} from "react";
import { FormProvider } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useHydrated, useAuthenticityToken } from "remix-utils";
import isFunction from "lodash/isFunction";

import { generateUUID, omitEmptyFields } from "~/utils";

import { EFormMethods } from "./enums";
import { useScrollToFirstErrorField } from "./hooks";
import type { TFormComponentProps } from "./types";

const FormComponent = <T extends FieldValues>({
  //authenticity = true,
  id,
  children,
  onChange,
  handleSubmit,
  method = EFormMethods.Get,
  noValidate,
  form,
  className,
}: TFormComponentProps<T>) => {
  const isHydrated = useHydrated();
  //const csrf = useAuthenticityToken();
  useScrollToFirstErrorField(form);

  const resultFormId = useMemo(
    () => (!isHydrated ? undefined : id || generateUUID()),
    [id, isHydrated],
  );

  const onSubmit = useCallback(
    (data: T) => {
      let preparedData = {
        ...omitEmptyFields(data),
      };

      // if (authenticity) {
      //   preparedData.csrf = csrf;
      // }

      if (handleSubmit) {
        handleSubmit(preparedData, { fetcher: form.fetcher });
      }
    },
    // [authenticity, handleSubmit, csrf, form.fetcher],
      [handleSubmit, form.fetcher],
  );

  return (
    <FormProvider {...form.methods}>
      <form
        id={resultFormId}
        className={className}
        method={method}
        noValidate={noValidate ?? isHydrated}
        onChange={onChange}
        onSubmit={form.methods.handleSubmit(onSubmit)}
      >
        {isFunction(children) ? children(form.methods) : children}
      </form>
    </FormProvider>
  );
};

export const Form = memo(FormComponent) as typeof FormComponent;
