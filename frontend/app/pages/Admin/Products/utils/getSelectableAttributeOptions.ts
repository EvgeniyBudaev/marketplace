type TProps = ({ values }: { values: { id: number; value: string }[] }) => {
  selectableAttributeOptions: { value: string; label: string }[];
};

export const getSelectableAttributeOptions: TProps = ({ values }) => {
  const selectableAttributeOptions = values.map((item) => {
    return {
      value: item.id.toString(),
      label: item.value,
    };
  });

  return { selectableAttributeOptions };
};
