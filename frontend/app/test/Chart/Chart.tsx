import * as React from "react";
import type { FC } from "react";
import { memo, useEffect, useRef, useState } from "react";
import type { Chart as ChartAntvG2 } from "@antv/g2";
import { getThemeColor } from "~/test/utils";
import { createChart, updateChart } from "./utils";
import type { EChartVariants, TChartData, TFormatNumber } from "./types";

export type TChartProps = {
  className?: string;
  banknote?: string;
  colorLabelXAxis?: string;
  colorLabelYAxis?: string;
  currencyUnit?: string;
  data: TChartData[];
  heightChart?: number;
  max?: number;
  min?: number;
  theme?: string;
  tickInterval?: number;
  ticks?: number[];
  variantChart: EChartVariants;
  widthChart?: number;
  isAutoFit?: boolean;
  formatNumber?: TFormatNumber;
  dataTestId?: string;
};

const ChartComponent: FC<TChartProps> = ({
  className,
  banknote,
  colorLabelXAxis = getThemeColor("--color-grey-dark"),
  colorLabelYAxis = getThemeColor("--color-grey-dark"),
  currencyUnit,
  data,
  heightChart = 273,
  max,
  min,
  theme,
  tickInterval,
  ticks,
  variantChart,
  widthChart,
  isAutoFit = true,
  formatNumber,
  dataTestId,
}) => {
  const chartContainer = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<ChartAntvG2 | null>(null);

  useEffect(() => {
    if (chartContainer.current) {
      chartContainer.current.innerHTML = "";
      setChart(
        createChart({
          container: chartContainer.current,
          height: heightChart,
          width: widthChart,
          autoFit: isAutoFit,
        }),
      );
    }
  }, [data, heightChart, isAutoFit, widthChart]);

  useEffect(() => {
    if (chart) {
      updateChart({
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
      });
      chart.render();
    }
  }, [
    banknote,
    chart,
    colorLabelXAxis,
    colorLabelYAxis,
    currencyUnit,
    max,
    min,
    theme,
    tickInterval,
    ticks,
    variantChart,
    formatNumber,
    data,
  ]);

  return <div className={className} ref={chartContainer} data-testid={dataTestId} />;
};

export const Chart = memo(ChartComponent);
