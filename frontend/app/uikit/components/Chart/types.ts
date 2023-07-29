import type BigDecimal from 'big.js';

export enum EChartVariants {
  Variant1 = 'VARIANT1',
  Variant2 = 'VARIANT2',
  Variant3 = 'VARIANT3',
}

export type TChartCurrency = 'crypto' | 'fiat';

export type TChartData = {
  part: number;
  month: string;
  negative?: { crypto?: number; fiat?: number };
  positive?: { crypto?: number; fiat?: number };
  value?: { crypto: number; fiat: number };
};

export type TChartVariant1 = {
  part: number;
  month: string;
  negative: { crypto: number; fiat: number };
  positive: { crypto: number; fiat: number };
};

export type TChartVariant2 = {
  part: number;
  month: string;
  value?: { crypto: number; fiat: number };
};

export type TFormatNumber = (amount: number, options?: Intl.NumberFormatOptions) => string;

export type TFormatCryptoCurrency = (
  amount: string | number | BigDecimal,
  cryptoCurrencyCode?: string | null,
  decimals?: number | null,
  options?: Intl.NumberFormatOptions,
) => string;

export type TFormatCurrency = (
  amount: string | number,
  currencyCode: string,
  options?: Intl.NumberFormatOptions,
) => string;
