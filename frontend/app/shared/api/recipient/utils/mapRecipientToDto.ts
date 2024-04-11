type TProps = {
  csrf: string;
  email?: string;
  name?: string;
  phone?: string;
  surname?: string;
  uuid: string;
};

export const mapRecipientToDto = (props: TProps) => {
  const { csrf, ...params } = props;
  return params;
};
