export const getNumericValues = (data: string) => {
  const numericValues: { attributeAlias: string; value: string }[] = JSON.parse(
    data.trim()
  );
  return numericValues.map((item) => ({ ...item, value: Number(item.value) }));
};
