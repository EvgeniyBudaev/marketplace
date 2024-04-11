import { FetcherWithComponents, useFetcher } from "@remix-run/react";
import { useMemo, useEffect, useState } from "react";
import type { TActionResponse } from "#app/types";
import { formatDomainErrors } from "#app/utils";

export type TUseFetcherDataReturn<TData> = {
  fetcher: FetcherWithComponents<any>;
  isSucceeded: boolean;
  isLoading: boolean;
  formError?: string;
  fieldErrors?: Record<string, string | undefined>;
  data: TData | null;
};

export type TFetcherOnSuccessCallback<TData> = (data: TData) => void;

export function useFetcherData<TData = any>(
  onSuccess?: TFetcherOnSuccessCallback<TData>,
  onFailure?: () => void
): TUseFetcherDataReturn<TData> {
  const [isSucceeded, setIsSucceeded] = useState(false);
  const fetcher = useFetcher<TData | string>();
  const isLoading = fetcher.state !== "idle";
  const fetcherResponse: TActionResponse<TData> | null = useMemo(() => {
    if (!fetcher.data) {
      return null;
    }

    if (typeof fetcher.data !== "string") {
      return fetcher.data;
    }

    try {
      return JSON.parse(fetcher.data);
    } catch (error) {
      return fetcher.data;
    }
  }, [fetcher.data]);

  const { formError = undefined, fieldErrors = undefined } =
    fetcherResponse && !fetcherResponse.success ? fetcherResponse : {};

  const formattedFieldErrors = useMemo(
    () => formatDomainErrors(fieldErrors),
    [fieldErrors]
  );

  useEffect(() => {
    if (fetcher.type === "done" && fetcherResponse?.success) {
      setIsSucceeded(true);
      onSuccess?.(fetcherResponse.data);
    } else if (fetcher.type === "done" && fetcherResponse?.success === false) {
      setIsSucceeded(false);
      onFailure?.();
    } else {
      setIsSucceeded(false);
    }
    // нужно чтобы вызов колбэка происходил только когда поменяется статус и будет успешный ответ
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.type, fetcherResponse]);

  return {
    fetcher,
    isSucceeded,
    isLoading,
    formError,
    fieldErrors: formattedFieldErrors ?? undefined,
    data: fetcherResponse?.success ? fetcherResponse.data : null,
  };
}
