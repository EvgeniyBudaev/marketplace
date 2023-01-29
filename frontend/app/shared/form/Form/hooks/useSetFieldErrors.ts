import { useEffect } from "react";
import type { Path } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { TUseInitFormReturn } from "~/shared/form";

export const useSetFieldErrors = <T extends FieldValues>(form: TUseInitFormReturn<T>): void => {
  const { fetcher, methods } = form;
  const fieldErrors = fetcher?.data?.fieldErrors;

  useEffect(() => {
    if (fieldErrors) {
      for (const error in fieldErrors) {
        methods.setError(error as Path<T>, {
          message: fieldErrors[error].map((message: any) => message).join(", "),
        });
      }
    }
  }, [fieldErrors, methods]);
};
