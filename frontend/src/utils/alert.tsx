import React from "react";
import { toast } from "react-toastify";
import { Alert, AlertType } from "src/uikit";

export const AlertError = (
  title?: string,
  description?: string
): React.ReactText =>
  toast.error(
    <Alert title={title} description={description} type={AlertType.Error} />,
    {
      position: toast.POSITION.TOP_RIGHT,
    }
  );

export const AlertSuccess = (
  title?: string,
  description?: string
): React.ReactText =>
  toast.success(
    <Alert title={title} description={description} type={AlertType.Success} />,
    {
      position: toast.POSITION.TOP_RIGHT,
    }
  );
