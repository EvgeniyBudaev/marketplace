import { memo, useCallback, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useHydrated } from "remix-utils/use-hydrated";
import { useAuthenticityToken } from "remix-utils/csrf/react";
import isFunction from "lodash/isFunction";

import { scrollToFirstErrorField } from "#app/shared/form/Form/utils";
import { generateUUID, omitEmptyFields } from "#app/utils";

import { EFormMethods } from "./enums";
import { useSetFieldErrors } from "./hooks";
import type { TFormComponentProps } from "./types";

const Component = <T extends FieldValues>({
  // authenticity = true,
  id,
  children,
  onChange,
  handleSubmit,
  method = EFormMethods.Get,
  noValidate,
  form,
  className,
  action,
}: TFormComponentProps<T>) => {
  const isHydrated = useHydrated();
  const csrf = useAuthenticityToken();
  useSetFieldErrors(form);

  const { fetcher } = form;

  const resultFormId = useMemo(
    () => (!isHydrated ? undefined : id || generateUUID()),
    [id, isHydrated]
  );

  const onSubmit = useCallback(
    (data: T) => {
      let preparedData = {
        ...omitEmptyFields(form.methods.getValues()),
        ...omitEmptyFields(data),
        csrf,
      };

      // if (authenticity) {
      //   preparedData.csrfServer = csrfServer;
      // }

      if (handleSubmit) {
        handleSubmit(preparedData, { fetcher });
      }
    },
    // [authenticity, handleSubmit, csrfServer, form.fetcher],
    [handleSubmit, fetcher, form.methods.getValues]
  );

  return (
    <FormProvider {...form.methods}>
      <form
        id={resultFormId}
        className={className}
        method={method}
        noValidate={noValidate ?? isHydrated}
        onChange={onChange}
        onSubmit={form.methods.handleSubmit(onSubmit, scrollToFirstErrorField)}
        action={action}
      >
        {isFunction(children) ? children(form.methods) : children}
      </form>
    </FormProvider>
  );
};

export const Form = memo(Component) as typeof Component;
