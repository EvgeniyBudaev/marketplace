export type TApiFunction<TParams, TResponse> = (
  request: Request,
  params: TParams,
) => Promise<TResponse>;
