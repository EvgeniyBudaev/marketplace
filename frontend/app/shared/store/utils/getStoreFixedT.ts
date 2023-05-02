import type { TFunction } from "i18next";
import { remixI18next } from "~/services";
import { getStoreLanguage, parseAcceptLanguage } from "~/shared/store";

const DEFAULT_NAMESPACE = "index";

export async function getStoreFixedT(
  request: Request,
  namespaces: string | string[] = DEFAULT_NAMESPACE,
  uuid: string,
): Promise<TFunction> {
  const language = await getStoreLanguage(request, uuid);
  return remixI18next.getFixedT(language.toLowerCase() ?? parseAcceptLanguage(request), namespaces);
}
