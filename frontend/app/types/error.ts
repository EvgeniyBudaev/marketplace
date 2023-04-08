export type IError = {
  success: false;
  error: {
    body: string;
    message: string;
  };
};

export type TDomainErrors<TNames extends string = string> = Record<
  TNames,
  string | string[] | undefined
>;

export interface IResponseFieldError {
  code: string;
  message: string;
}

export interface IResponseFieldErrors {
  [key: string]: IResponseFieldError[];
}

export interface ICommonResponseError {
  code: string;
  message: string;
  path: string;
  fieldErrors?: IResponseFieldErrors;
}
