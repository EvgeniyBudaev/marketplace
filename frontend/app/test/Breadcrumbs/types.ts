import type { TFunction } from 'react-i18next';
import type { z } from 'zod';
import type { BreadcrumbParamsSchema, BreadcrumbSchema, BreadcrumbHandleSchema } from './schemas';

export type TBreadcrumbParams = z.infer<typeof BreadcrumbParamsSchema>;

export type TBreadcrumbTitleFunction = (t: TFunction, params: TBreadcrumbParams) => string;

export type TBreadcrumbTitle = string | TBreadcrumbTitleFunction;

export type TBreadcrumb = Omit<z.infer<typeof BreadcrumbSchema>, 'title'> & {
  title: TBreadcrumbTitle;
};

export type TBreadcrumbHandle = Omit<z.infer<typeof BreadcrumbHandleSchema>, 'breadcrumb'> & {
  breadcrumb?: TBreadcrumb;
};

export type TExtendedBreadcrumb = TBreadcrumb & {
  to: string;
};
