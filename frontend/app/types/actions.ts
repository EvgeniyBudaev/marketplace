import type { TDomainErrors } from "#app/shared/domain";

export type TActionFormError =
  | {
      success: boolean;
      formError?: string;
      fieldErrors?: TDomainErrors;
    }
  | undefined;

export type TActionResponseSuccess<TData = any> = {
  success: true;
  data: TData;
};

export type TActionResponseFailure = {
  success: false;
  formError?: string;
  fieldErrors?: TDomainErrors;
};

export type TActionResponse<TData = any> =
  | TActionResponseSuccess<TData>
  | TActionResponseFailure;
