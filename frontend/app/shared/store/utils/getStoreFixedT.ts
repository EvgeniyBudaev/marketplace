import type { TFunction } from "i18next";
import { getStoreLanguage } from "./getStoreLanguage";
import { parseAcceptLanguage } from "./parseAcceptLanguage";
import { remixI18next } from "~/services";

const DEFAULT_NAMESPACE = "index";

export async function getStoreFixedT(
  request: Request,
  namespaces: string | string[] = DEFAULT_NAMESPACE,
): Promise<TFunction> {
  const language = await getStoreLanguage(request);

  return remixI18next.getFixedT(language ?? parseAcceptLanguage(request), namespaces);
}
