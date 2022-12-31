import type { TFunction } from "i18next";

export const DEFAULT_STATUS_MESSAGE = (t: TFunction<"translation", unknown>) =>
  t("errorBoundary.common.unexpectedStatus");

export const DEFAULT_STATUS_MAP = new Map([
  [500, (t: TFunction<"translation", unknown>) => t("errorBoundary.common.internalError")],
  [501, (t: TFunction<"translation", unknown>) => t("errorBoundary.common.notImplemented")],
  [504, (t: TFunction<"translation", unknown>) => t("errorBoundary.common.gatewayTimeout")],
  [400, (t: TFunction<"translation", unknown>) => t("errorBoundary.common.badRequest")],
  [403, (t: TFunction<"translation", unknown>) => t("errorBoundary.common.accessDenied")],
  [404, (t: TFunction<"translation", unknown>) => t("errorBoundary.common.notFound")],
]);
