import type { Chart } from "@antv/g2";
import { getThemeColor } from "~/utils";
import { getCommonYAxisProps } from "./getCommonYAxisProps";
import { getCommonXAxisProps } from "./getCommonXAxisProps";
import type { TChartData, TChartVariant1, TChartVariant2, TFormatNumber } from "../types";
import { EChartVariants } from "../types";

export function updateChart({
  banknote,
  chart,
  colorLabelXAxis,
  colorLabelYAxis,
  currencyUnit,
  max,
  min,
  tickInterval,
  ticks,
  variantChart,
  formatNumber,
  data,
}: {
  banknote?: string;
  chart: Chart;
  colorLabelXAxis: string;
  colorLabelYAxis: string;
  currencyUnit?: string;
  max?: number;
  min?: number;
  tickInterval?: number;
  ticks?: number[];
  variantChart: EChartVariants;
  formatNumber?: TFormatNumber;
  data: TChartData[];
}) {
  const START_Y_AXIS_FACTOR = 0.99;
  min = min && min * START_Y_AXIS_FACTOR;
  const minVisibleValue = (2 * Math.abs((max || 100) - (min || 0))) / 100;
  chart.axis("month", getCommonXAxisProps(colorLabelXAxis));

  if (variantChart === EChartVariants.Variant1) {
    chart.data(
      (data as TChartVariant1[]).map((value) => ({
        ...value,
        positiveAdjusted: value.positive && Math.max(value.positive, minVisibleValue),
        negativeAdjusted: value.negative && Math.min(value.negative, -minVisibleValue),
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
    chart.axis("positive", {});
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
        if (val > 0) return `+${currencyUnit}${formatNumber ? formatNumber(val) : val} ${banknote}`;
        if (val < 0)
          return `-${currencyUnit}${
            formatNumber ? formatNumber(Math.abs(val)) : Math.abs(val)
          } ${banknote}`;
        return `${banknote}0`;
      },
    };

    chart.scale("positiveAdjusted", scale);
    chart.scale("negativeAdjusted", scale);

    chart.legend(false);

    const positiveTooltip = [
      "positive",
      (value: number) => {
        return {
          name: "value",
          value: `${value > 0 ? "+" : ""}${currencyUnit}${
            formatNumber ? formatNumber(Math.abs(value)) : Math.abs(value)
          } ${banknote}`,
        };
      },
    ] as const;
    const negativeTooltip = [
      "negative",
      (value: number) => {
        return {
          name: "value",
          value: `${value < 0 ? "-" : ""}${currencyUnit}${
            formatNumber ? formatNumber(Math.abs(value)) : Math.abs(value)
          } ${banknote}`,
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
        value.value && Math.sign(value.value) * Math.max(Math.abs(value.value), minVisibleValue),
    }));
  };

  const singleValueTooltip = [
    "value",
    (value: number) => {
      return {
        name: "value",
        value: `${currencyUnit}${formatNumber ? formatNumber(value) : value} ${banknote}`,
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
