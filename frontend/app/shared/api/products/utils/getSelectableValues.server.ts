export const getSelectableValues = (data: string) => {
  const selectableValues: string[] = JSON.parse(data.trim());
  return selectableValues.map((item) => Number(item));
};
