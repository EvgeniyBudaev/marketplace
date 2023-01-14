type TProps = {
  productAlias: string;
  type: string;
  uuid: string;
};

export const mapCartActionToDto = (data: TProps) => {
  const { type, ...params } = data;
  return params;
};
