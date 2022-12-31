import type { TParams } from "~/types";
import { omitEmptyFields } from "./form";

export const transformObjectToURLParams = (params: TParams): string => {
  return new URLSearchParams(Object.entries(omitEmptyFields(params))).toString();
};
