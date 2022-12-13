import { useMemo } from "react";
import type { FetcherWithComponents } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import type { FieldValues, Resolver, UseFormProps, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

import { getFetcherOptions } from "~/shared/fetcher";

type TUseInitForm<T extends FieldValues> = {
  resolver?: Resolver<T>;
} & UseFormProps<T>;

export type TUseInitFormReturn<T extends FieldValues> = {
  fetcher: FetcherWithComponents<FieldValues>;
  isLoading: boolean;
  isIdle: boolean;
  isInitType: boolean;
  isDoneType: boolean;
  methods: UseFormReturn<T, any>;
};

export const useInitForm = <T extends FieldValues>({
  resolver,
  mode = "all",
  reValidateMode,
  defaultValues,
  context,
  shouldFocusError,
  shouldUnregister,
  shouldUseNativeValidation,
  criteriaMode,
  delayError,
}: TUseInitForm<T>): TUseInitFormReturn<T> => {
  const fetcher = useFetcher<T>();
  const methods = useForm<T>({
    resolver,
    mode,
    reValidateMode,
    defaultValues,
    context,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    criteriaMode,
    delayError,
  });

  return useMemo(
    () => ({
      methods,
      ...getFetcherOptions<T>(fetcher as any),
    }),
    [fetcher, methods],
  );
};
