import * as React from "react";
import type { FieldValues } from "react-hook-form";
import type { FetcherWithComponents } from "@remix-run/react";
import isString from "lodash/isString";

type TError = {
  id?: string;
  title: string;
};

type TUseGetFormErrors = (
  fetcher: FetcherWithComponents<FieldValues>
) => TError[];

export const useGetFormErrors: TUseGetFormErrors = (fetcher) => {
  let data = fetcher.data;

  const errors = React.useMemo(() => {
    try {
      if (isString(data)) {
        data = JSON.parse(data);
      }

      if (data?.formError) {
        const errors = [data?.formError]
          .filter(Boolean)
          .map((error: string) => ({ title: error }));

        return errors;
      }
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  return errors || [];
};
