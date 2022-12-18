import { FieldValues } from "react-hook-form";
import { FetcherWithComponents } from "@remix-run/react";
import type z from "zod";
import { formSchema } from "~/pages/Shipping/schemas";

export type TForm = z.infer<typeof formSchema>;

export type TOptionsSubmitForm = {
  fetcher: FetcherWithComponents<FieldValues>;
};
