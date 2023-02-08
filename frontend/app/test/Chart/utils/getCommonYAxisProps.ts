export const getCommonYAxisProps = (colorLabelYAxis: string) => {
  return {
    grid: null,
    label: {
      offset: 16,
      style: {
        fill: colorLabelYAxis,
        fontSize: 12,
        fontWeight: 400,
        fontFamily: "Inter",
      },
    },
  };
};
