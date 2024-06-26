import pickBy from "lodash/pickBy";
import isNil from "lodash/isNil";
import type { TParams } from "#app/types";

export function omitEmptyFields<T extends TParams>(fields: T): TParams {
  return pickBy<T>(fields, (field: any) => {
    if (
      isNil(field) ||
      ((typeof field === "string" || Array.isArray(field)) && !field.length)
    ) {
      return false;
    }

    return true;
  });
}
