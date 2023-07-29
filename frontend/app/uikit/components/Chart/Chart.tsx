import type { FC } from 'react';
import * as React from 'react';
import { memo, useEffect, useRef, useState } from 'react';

import type { Chart as ChartAntvG2 } from '@antv/g2';
import {getThemeColor} from "~/uikit/utils";
import type {
  EChartVariants,
  TChartCurrency,
  TChartData,
  TFormatCryptoCurrency,
  TFormatCurrency,
  TFormatNumber,
} from './types';
import { createChart, updateChart } from './utils';

const DATA_TEST_ID = 'ui-kit-component__chart';

export type TChartProps = {
  className?: string;
  banknote?: string;
  colorLabelXAxis?: string;
  colorLabelYAxis?: string;
  currencyCode?: string;
  currencyUnit?: string;
  data: TChartData[];
  heightChart?: number;
  listCurrenciesShow?: TChartCurrency[];
  max?: number;
  min?: number;
  theme?: string;
  tickInterval?: number;
  ticks?: number[];
  variantChart: EChartVariants;
  widthChart?: number;
  isAutoFit?: boolean;
  formatNumber?: TFormatNumber;
  formatCryptoCurrency?: TFormatCryptoCurrency;
  formatCurrency?: TFormatCurrency;
  dataTestId?: string;
};

const ChartComponent: FC<TChartProps> = ({
  className,
  banknote,
  colorLabelXAxis = getThemeColor('--color-grey-dark'),
  colorLabelYAxis = getThemeColor('--color-grey-dark'),
  currencyCode,
  currencyUnit,
  data,
  heightChart = 273,
  listCurrenciesShow,
  max,
  min,
  theme,
  tickInterval,
  ticks,
  variantChart,
  widthChart,
  isAutoFit = true,
  formatNumber,
  formatCryptoCurrency,
  formatCurrency,
  dataTestId = DATA_TEST_ID,
}) => {
  const chartContainer = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<ChartAntvG2 | null>(null);

  useEffect(() => {
    if (chartContainer.current) {
      chartContainer.current.innerHTML = '';
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
      });
      chart.render();
    }
  }, [
    banknote,
    chart,
    colorLabelXAxis,
    colorLabelYAxis,
    currencyCode,
    currencyUnit,
    listCurrenciesShow,
    max,
    min,
    theme,
    tickInterval,
    ticks,
    variantChart,
    formatNumber,
    data,
    formatCryptoCurrency,
    formatCurrency,
  ]);

  return <div className={className} ref={chartContainer} data-testid={dataTestId} />;
};

export const Chart = memo(ChartComponent);
