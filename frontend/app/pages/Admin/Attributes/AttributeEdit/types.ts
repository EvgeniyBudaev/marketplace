import type { FieldValues } from "react-hook-form";
import type { FetcherWithComponents } from "@remix-run/react";
import type z from "zod";
import type { formSchema } from "./schemas";

export type TForm = z.infer<typeof formSchema>;

export type TOptionsSubmitForm = {
  fetcher: FetcherWithComponents<FieldValues>;
};

export type TAddModalState = {
  isOpen: boolean;
};
