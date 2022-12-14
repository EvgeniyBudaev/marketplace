import type { ErrorBoundaryComponent } from "@remix-run/node";
import { Error } from "~/components";

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <Error error={error} />;
};
