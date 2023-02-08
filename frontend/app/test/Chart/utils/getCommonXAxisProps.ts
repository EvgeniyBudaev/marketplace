export const getCommonXAxisProps = (colorLabelXAxis: string) => ({
  line: null,
  tickLine: null,
  label: {
    offset: 16,
    style: {
      fill: colorLabelXAxis,
      fontSize: 12,
      fontWeight: 500,
      fontFamily: "Montserrat Alternates",
    },
  },
  grid: {
    line: {
      type: "line",
      style: (_: any, index: number) => {
        if (index % 2 === 0) {
          return {
            lineWidth: 60,
            stroke: "transparent",
          };
        }

        return {
          lineWidth: 60,
          stroke: "transparent",
        };
      },
    },
  },
});
