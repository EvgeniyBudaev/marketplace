type TProps = {
  newQuantity: string;
  productAlias: string;
  type: string;
  uuid: string;
};

export const mapCartSetQuantityToDto = (data: TProps) => {
  const { type, newQuantity, ...params } = data;
  return { newQuantity: Number(newQuantity), ...params };
};
