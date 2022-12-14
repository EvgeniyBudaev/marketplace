import type { ComponentType } from "react";
import { Fragment } from "react";
import type { ErrorBoundaryComponent } from "@remix-run/node";
import { ErrorBoundary as DefaultErrorBoundary } from "~/components";

type TCreateErrorBoundaryParams = {
  ErrorBoundary?: ErrorBoundaryComponent;
  Layout?: ComponentType;
};

export const createErrorBoundary = ({
  Layout = Fragment,
  ErrorBoundary = DefaultErrorBoundary,
}: TCreateErrorBoundaryParams): ErrorBoundaryComponent => {
  const ErrorBoundaryWrapper = ({ error }: any) => (
    <Layout>
      <ErrorBoundary error={error} />
    </Layout>
  );

  return ErrorBoundaryWrapper;
};
