import type { FC } from "react";
import type { TFormErrorsProps } from "~/components/form/FormErrors/types";
import { useGetFormErrors } from "~/hooks";
import { Error } from "~/uikit";

export const FormErrors: FC<TFormErrorsProps> = ({ fetcher }) => {
  const errors = useGetFormErrors(fetcher);

  return <Error errors={errors} />;
};
