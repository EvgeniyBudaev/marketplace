type TProps = {
  csrf: string;
  uuid: string;
};

export const mapOrderToDto = (props: TProps) => {
  const { csrf, ...params } = props;
  return params;
};
