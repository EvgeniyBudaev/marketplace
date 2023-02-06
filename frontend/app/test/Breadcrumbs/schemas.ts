import { z } from 'zod';

export const BreadcrumbPrefetchSchema = z.union([
  z.literal('intent'),
  z.literal('render'),
  z.literal('none'),
]);

export const BreadcrumbParamsSchema = z.record(z.string().optional());

export const I18FunctionSchema = z.function();

export const BreadcrumbTitleFunctionSchema = z
  .function()
  .args(I18FunctionSchema, BreadcrumbParamsSchema)
  .returns(z.string());

export const BreadcrumbTitleSchema = z.union([z.string(), BreadcrumbTitleFunctionSchema]);

export const BreadcrumbSchema = z.object({
  title: BreadcrumbTitleSchema,
  prefetch: BreadcrumbPrefetchSchema.optional(),
});

export const BreadcrumbHandleSchema = z.object({
  breadcrumb: BreadcrumbSchema.optional(),
});
