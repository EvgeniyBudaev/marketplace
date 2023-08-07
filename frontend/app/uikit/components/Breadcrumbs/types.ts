import type { z } from "zod";
import type { BreadcrumbParamsSchema, BreadcrumbSchema, BreadcrumbHandleSchema } from "./schemas";

export type TBreadcrumbParams = z.infer<typeof BreadcrumbParamsSchema>;

type TBreadcrumbTitleFunction = (t: any, params: TBreadcrumbParams) => string;

type TBreadcrumbTitle = string | TBreadcrumbTitleFunction;

interface TBreadcrumb extends z.infer<typeof BreadcrumbSchema> {
  title: TBreadcrumbTitle;
}

export interface TBreadcrumbHandle extends z.infer<typeof BreadcrumbHandleSchema> {
  breadcrumb?: TBreadcrumb;
}

export interface TExtendedBreadcrumb extends TBreadcrumb {
  to: string;
}
