export type TFormattedDomainErrors<TNames extends string = string> = Record<
  TNames,
  string | undefined
> | null;
