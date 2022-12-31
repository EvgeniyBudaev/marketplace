import type { ComponentType } from "react";
import type { ReactNode } from "react";
import type { ErrorBoundaryComponent } from "@remix-run/node";
import type { TFunction } from "i18next";

export type TWithChildrenProps = {
  children?: ReactNode;
};

export type TErrorBoundaries = {
  ErrorBoundary: ErrorBoundaryComponent;
  CatchBoundary: ComponentType;
};

export type TCatchBoundaryMessageFunction = (t: TFunction) => string;

export type TCatchBoundaryMessage = string | TCatchBoundaryMessageFunction;

export type TCatchBoundaryStatusMap = Map<number, TCatchBoundaryMessage>;
