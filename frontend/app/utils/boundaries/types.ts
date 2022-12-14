import type { ComponentType } from "react";
import { ErrorBoundaryComponent } from "@remix-run/node";
import { TFunction } from "i18next";

export type TErrorBoundaries = {
  ErrorBoundary: ErrorBoundaryComponent;
  CatchBoundary: ComponentType;
};

export type TCatchBoundaryMessageFunction = (t: TFunction) => string;

export type TCatchBoundaryMessage = string | TCatchBoundaryMessageFunction;

export type TCatchBoundaryStatusMap = Map<number, TCatchBoundaryMessage>;