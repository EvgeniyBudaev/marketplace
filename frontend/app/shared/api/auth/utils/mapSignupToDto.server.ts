import type { TParams } from "#app/types";

type TMapSignupToDto = (params: TParams) => TParams;

export const mapSignupToDto: TMapSignupToDto = ({
  csrf,
  rePassword,
  ...form
}) => {
  return form;
};
