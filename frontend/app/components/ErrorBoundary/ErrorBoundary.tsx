import type { ErrorBoundaryComponent } from "@remix-run/node";
import { Error } from "#app/components";

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <Error error={error} />;
};
