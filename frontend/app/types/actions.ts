import type { TDomainErrors } from "~/shared/domain";

export type TActionResponseFailure = {
  success: false;
  formError?: string;
  fieldErrors?: TDomainErrors;
};
