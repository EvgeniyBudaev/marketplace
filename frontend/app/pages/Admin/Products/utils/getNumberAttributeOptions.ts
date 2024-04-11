type TProps = ({
  values,
}: {
  values: { id: number; name: string; alias: string }[];
}) => {
  numberAttributeOptions: { value: string; label: string }[];
};

export const getNumberAttributeOptions: TProps = ({ values }) => {
  const numberAttributeOptions = values.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    };
  });

  return { numberAttributeOptions };
};
