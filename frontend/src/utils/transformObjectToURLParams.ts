import {TParams} from "src/types";
import {omitEmptyFields} from "./form";

export const transformObjectToURLParams = (params: TParams): string => {
    return new URLSearchParams(Object.entries(omitEmptyFields(params))).toString();
}