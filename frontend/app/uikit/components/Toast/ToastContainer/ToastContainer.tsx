import { memo } from "react";
import type { FC } from "react";
import { ToastContainer as ReactToastContainer } from "react-toastify";

const Component: FC = () => {
  return <ReactToastContainer hideProgressBar />;
};

export const ToastContainer = memo(Component);
