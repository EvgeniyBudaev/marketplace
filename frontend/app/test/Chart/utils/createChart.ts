import { Chart } from "@antv/g2";

export function createChart({
  container,
  height,
  width,
  autoFit,
}: {
  container: any;
  height: number;
  width?: number;
  autoFit: boolean;
}): Chart {
  const chart = new Chart({
    container,
    width,
    height,
    autoFit,
  });
  return chart;
}
