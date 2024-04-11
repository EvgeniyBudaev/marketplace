import type { FC } from "react";
import type { TFormErrorsProps } from "#app/components/form/FormErrors/types";
import { useGetFormErrors } from "#app/hooks";
import { Error } from "#app/uikit";

export const FormErrors: FC<TFormErrorsProps> = ({ fetcher }) => {
  const errors = useGetFormErrors(fetcher);

  return <Error errors={errors} />;
};
