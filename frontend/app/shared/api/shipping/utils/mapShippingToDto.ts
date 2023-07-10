type TProps = {
  address: string;
  comment?: string;
  csrf: string;
  flat?: string;
  floor?: string;
  uuid: string;
};

export const mapShippingToDto = (props: TProps) => {
  const { csrf, ...params } = props;
  return params;
};
