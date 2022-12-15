import { Fragment } from "react";
import type { ErrorBoundaryComponent } from "@remix-run/node";
import { ErrorBoundary as DefaultErrorBoundary } from "~/components";
import { createCatchBoundary, createErrorBoundary } from "~/utils";
import type { TCreateCatchBoundaryParams } from "~/utils";
import type { TErrorBoundaries } from "./types";

type TCreateBoundariesParams = TCreateCatchBoundaryParams & {
  ErrorBoundary?: ErrorBoundaryComponent;
};

export const createBoundaries = ({
  ErrorBoundary = DefaultErrorBoundary,
  Layout = Fragment,
  ...restParams
}: TCreateBoundariesParams = {}): TErrorBoundaries => {
  const CatchBoundaryComponent = createCatchBoundary({
    Layout,
    ...restParams,
  });
  const ErrorBoundaryComponent = createErrorBoundary({
    ErrorBoundary,
    Layout,
  });

  return {
    ErrorBoundary: ErrorBoundaryComponent,
    CatchBoundary: CatchBoundaryComponent,
  };
};
