import acceptLanguage from "accept-language-parser";
import { ELanguages } from "~/uikit";

export function parseAcceptLanguage(request: Request): string {
  const acceptLanguages = acceptLanguage.parse(request.headers.get("Accept-Language") as string);

  if (acceptLanguages?.length < 1) return ELanguages.Ru.toLowerCase();

  return acceptLanguages[0].code === ELanguages.Ru.toLowerCase()
    ? ELanguages.Ru.toLowerCase()
    : ELanguages.En.toLowerCase();
}
