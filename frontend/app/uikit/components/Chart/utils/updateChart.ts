import type { Chart } from "@antv/g2";
import { getThemeColor } from "~/uikit/utils";
import { EAmount, EOperator, EStatus } from "../enums";
import type {
  TChartCurrency,
  TChartData,
  TChartVariant1,
  TChartVariant2,
  TFormatCryptoCurrency,
  TFormatCurrency,
  TFormatNumber,
} from "../types";
import { EChartVariants } from "../types";
import { getCommonXAxisProps } from "./getCommonXAxisProps";
import { getCommonYAxisProps } from "./getCommonYAxisProps";

export function updateChart({
  banknote,
  chart,
  colorLabelXAxis,
  colorLabelYAxis,
  currencyCode,
  currencyUnit,
  listCurrenciesShow,
  max,
  min,
  tickInterval,
  ticks,
  variantChart,
  formatNumber,
  formatCryptoCurrency,
  formatCurrency,
  data,
}: {
  banknote?: string;
  chart: Chart;
  colorLabelXAxis: string;
  colorLabelYAxis: string;
  currencyCode?: string;
  currencyUnit?: string;
  listCurrenciesShow?: TChartCurrency[];
  max?: number;
  min?: number;
  tickInterval?: number;
  ticks?: number[];
  variantChart: EChartVariants;
  formatNumber?: TFormatNumber;
  data: TChartData[];
  formatCryptoCurrency?: TFormatCryptoCurrency;
  formatCurrency?: TFormatCurrency;
}) {
  const START_Y_AXIS_FACTOR = 0.99;
  min = min && min * START_Y_AXIS_FACTOR;
  const minVisibleValue = (2 * Math.abs((max || 100) - (min || 0))) / 100;
  chart.axis("month", getCommonXAxisProps(colorLabelXAxis));

  chart.tooltip({
    itemTpl:
      '<li class="g2-tooltip-list-item"><div style="margin-bottom: 4px">{crypto}</div><div>{fiat}</div></li>',
  });

  const checkCurrency = (type: EAmount) => {
    if (!listCurrenciesShow) return false;
    return listCurrenciesShow.includes(type);
  };

  if (variantChart === EChartVariants.Variant1) {
    chart.data(
      (data as TChartVariant1[]).map((value) => ({
        ...value,
        positiveAdjusted: value.positive.crypto && Math.max(value.positive.crypto, minVisibleValue),
        negativeAdjusted:
          value.negative.crypto && Math.min(value.negative.crypto, -minVisibleValue),
      })),
    );

    chart.axis("positiveAdjusted", {
      ...getCommonYAxisProps(colorLabelYAxis),
      grid: {
        line: {
          style: (_, index, items) => {
            if (index === Math.floor(items.length / 2)) {
              return {
                lineDash: [6, 4],
                stroke: getThemeColor("--color-grey-dark"),
              };
            }
            return { stroke: "transparent" };
          },
        },
      },
    });
    chart.axis(EStatus.Positive, {});
    chart.axis("negativeAdjusted", {
      ...getCommonYAxisProps(colorLabelYAxis),
      label: null,
    });

    const scale = {
      min,
      max,
      tickInterval,
      nice: true,
      formatter: (val: number) => {
        if (val > 0) return `+${currencyUnit}${formatCryptoCurrency?.(val, banknote ?? "") ?? val}`;
        if (val < 0)
          return `-${currencyUnit}${
            formatCryptoCurrency?.(Math.abs(val), banknote ?? "") ?? Math.abs(val)
          }`;
        return formatCryptoCurrency?.(0, banknote ?? "") ?? `0 ${banknote}`;
      },
    };

    chart.scale("positiveAdjusted", scale);
    chart.scale("negativeAdjusted", scale);

    chart.legend(false);

    const getOperator = (value: number, status: EStatus) => {
      if (value > 0 && status === EStatus.Negative) return EOperator.Minus;
      else if (value > 0) return EOperator.Plus;
      else if (value < 0) return EOperator.Minus;
      else return "";
    };

    const getTypeFormat = (value: number, type: EAmount) => {
      if (type === EAmount.Crypto) {
        return formatCryptoCurrency?.(Math.abs(value), banknote ?? "") ?? Math.abs(value);
      }
      if (type === EAmount.Fiat) {
        return formatCurrency?.(Math.abs(value), currencyCode ?? "") ?? Math.abs(value);
      }
    };

    const getAmount = (value: number, type: EAmount, status: EStatus) => {
      return `${getOperator(value, status)}${currencyUnit}${getTypeFormat(value, type)}`;
    };

    const positiveTooltip = [
      EStatus.Positive,
      (value: { crypto: number; fiat: number }) => {
        return {
          ...(checkCurrency(EAmount.Crypto) && {
            crypto: getAmount(value.crypto, EAmount.Crypto, EStatus.Positive),
          }),
          ...(checkCurrency(EAmount.Fiat) && {
            fiat: getAmount(value.fiat, EAmount.Fiat, EStatus.Positive),
          }),
        };
      },
    ] as const;
    const negativeTooltip = [
      EStatus.Negative,
      (value: { crypto: number; fiat: number }) => {
        return {
          ...(checkCurrency(EAmount.Crypto) && {
            crypto: getAmount(value.crypto, EAmount.Crypto, EStatus.Negative),
          }),
          ...(checkCurrency(EAmount.Fiat) && {
            fiat: getAmount(value.fiat, EAmount.Fiat, EStatus.Negative),
          }),
        };
      },
    ] as const;

    chart
      .interval()
      .size({ values: [16] })
      .position("month*positiveAdjusted")
      .tooltip(...positiveTooltip)
      .color("value", () => getThemeColor("--color-accent-2"))
      .style({ radius: 4 })
      .adjust([{ type: "dodge", dodgeBy: "part", marginRatio: 1 }]);

    chart
      .interval()
      .size({ values: [16] })
      .position("month*negativeAdjusted")
      .tooltip(...negativeTooltip)
      .color("value", () => getThemeColor("--color-accent-1"))
      .style({ radius: 4 })
      .adjust([{ type: "dodge", dodgeBy: "part", marginRatio: 1 }]);
  }

  const mapSingleValueData = (data: TChartVariant2[]) => {
    return data.map((value) => ({
      ...value,
      valueAdjusted:
        value.value &&
        Math.sign(value.value.crypto) * Math.max(Math.abs(value.value.crypto), minVisibleValue),
    }));
  };

  const singleValueTooltip = [
    "value",
    (value: { crypto: number; fiat: number }) => {
      return {
        name: "value",
        ...(checkCurrency(EAmount.Crypto) && {
          crypto: `${currencyUnit}${
            formatCryptoCurrency?.(value.crypto, banknote ?? "") ?? value.crypto
          }`,
        }),
        ...(checkCurrency(EAmount.Fiat) && {
          fiat: `${currencyUnit}${formatCurrency?.(value.fiat, currencyCode ?? "") ?? value.fiat}`,
        }),
      };
    },
  ] as const;

  if (variantChart === EChartVariants.Variant2) {
    chart.data(mapSingleValueData(data));
    chart.axis("valueAdjusted", getCommonYAxisProps(colorLabelYAxis));
    chart.scale("valueAdjusted", {
      ticks,
      min,
      max,
      nice: true,
      formatter: (val) => {
        return `${currencyUnit}${formatNumber ? formatNumber(val) : val} ${banknote}`;
      },
    });
    chart.legend(false);

    chart
      .interval()
      .position("month*valueAdjusted")
      .tooltip(...singleValueTooltip)
      .size({ values: [16] })
      .style({ radius: 4 })
      .color("valueAdjusted", () => getThemeColor("--color-accent-2"))
      .adjust([{ type: "dodge", dodgeBy: "part", marginRatio: 1 }]);
  }

  if (variantChart === EChartVariants.Variant3) {
    chart.data(data);
    chart.axis("value", getCommonYAxisProps(colorLabelYAxis));
    chart.scale("value", {
      min: 0,
      max: 100,
      tickInterval: 10,
      nice: true,
      formatter: (val) => {
        return `${formatNumber ? formatNumber(val) : val}%`;
      },
    });
    chart.legend(false);
    chart
      .interval()
      .position("month*value")
      .size({ values: [16] })
      .style({ radius: 4 })
      .color("value", (val) => {
        if (val >= 15 && val <= 20) return getThemeColor("--color-accent-6");
        if (val > 20 && val <= 70) return getThemeColor("--color-accent-4");
        if (val > 70) return getThemeColor("--color-accent-1");
        return getThemeColor("--color-accent-3");
      })
      .adjust([{ type: "dodge", dodgeBy: "part", marginRatio: 1 }]);
  }
}
