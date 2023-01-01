import type { TForm } from "~/pages/Auth/Signup/types";

export const mapSignupToDto = ({ rePassword, ...form }: TForm) => {
  return form;
};
