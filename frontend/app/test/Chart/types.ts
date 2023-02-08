export enum EChartVariants {
  Variant1 = "VARIANT1",
  Variant2 = "VARIANT2",
  Variant3 = "VARIANT3",
}

export type TChartData = {
  part: number;
  month: string;
  negative?: number;
  positive?: number;
  value?: number;
};

export type TChartVariant1 = {
  part: number;
  month: string;
  negative: number;
  positive: number;
};

export type TChartVariant2 = {
  part: number;
  month: string;
  value?: number;
};

export type TFormatNumber = (amount: number, options?: Intl.NumberFormatOptions) => string;
