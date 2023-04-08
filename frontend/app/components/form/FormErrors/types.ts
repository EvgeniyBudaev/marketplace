import type { FieldValues } from "react-hook-form";
import type { FetcherWithComponents } from "@remix-run/react";

export type TFormErrorsProps = {
  fetcher: FetcherWithComponents<FieldValues>;
};
