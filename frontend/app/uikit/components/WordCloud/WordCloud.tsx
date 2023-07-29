import { WordCloud as Cloud } from '@ant-design/plots';
import type { WordCloudConfig } from '@ant-design/plots';
import * as React from 'react';

export type TWordCloudData = {
  name: string;
  value: number;
};

export type TWordCloudProps = {
  color?: string[];
  data: TWordCloudData[];
  dataTestId?: string;
};

export interface IWordCloudConfig extends WordCloudConfig {
  wordStyle: {
    fontFamily: string;
    fontSize: [number, number];
    rotation: number;
    gridSize: number;
    shuffle: false;
    shape: string;
    padding: number;
  };
}

const DATA_TEST_ID = 'ui-kit-component__word-cloud';

export const WordCloud: React.VFC<TWordCloudProps> = ({
  color = ['#5B61EC', '#1B202F', '#7381A7'],
  data,
  dataTestId = DATA_TEST_ID,
}) => {
  const config: IWordCloudConfig = {
    data,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    color,
    autoFit: true,
    wordStyle: {
      fontFamily: 'Gilroy',
      fontSize: [14, 28],
      rotation: 0,
      gridSize: 8,
      shuffle: false,
      shape: 'cardioid',
      padding: 6,
    },
    random: () => 0.5,
  };

  return <Cloud {...config} data-testid={dataTestId} />;
};
