import { FieldValues } from "react-hook-form";
import { FetcherWithComponents } from "@remix-run/react";
import type z from "zod";
import type { formSchema } from "./schemas";

export type TForm = z.infer<typeof formSchema>;

export type TOptionsSubmitForm = {
  fetcher: FetcherWithComponents<FieldValues>;
};
