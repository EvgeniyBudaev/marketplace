import type { TFunction } from "i18next";

function stringifyTranslationParams(...params: Parameters<TFunction>): string {
  return JSON.stringify(params);
}

// export const t: TFunction = stringifyTranslationParams;
export const t: (...params: Parameters<TFunction>) => string = stringifyTranslationParams;
