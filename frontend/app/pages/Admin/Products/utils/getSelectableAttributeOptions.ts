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

// type TProps = ({ values }: { values: {value: string, id: number, attributeType: string, attributeName: string, attributeAlias: string} }) => {
//   selectableAttributeOptions: { value: string; label: string }[];
// };
//
// export const getSelectableAttributeOptions: TProps = ({ values }) => {
//   const data = {
//     value: values.id.toString(),
//     label: values.value,
//   };
//
//   return { selectableAttributeOptions: [data] };
// };
