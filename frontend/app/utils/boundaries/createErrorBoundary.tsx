import type { ComponentType } from "react";
import { Fragment } from "react";
import type { ErrorBoundaryComponent } from "@remix-run/node";
import { ErrorBoundary as DefaultErrorBoundary } from "~/components";
import type { TWithChildrenProps } from "~/utils/boundaries";

type TCreateErrorBoundaryParams = {
  ErrorBoundary?: ErrorBoundaryComponent;
  Layout?: ComponentType<TWithChildrenProps>;
};

export const createErrorBoundary = ({
  Layout = Fragment,
  ErrorBoundary = DefaultErrorBoundary,
}: TCreateErrorBoundaryParams): ErrorBoundaryComponent => {
  return ({ error }) => (
    <Layout>
      <ErrorBoundary error={error} />
    </Layout>
  );
};
