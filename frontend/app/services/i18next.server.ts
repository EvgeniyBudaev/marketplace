import { RemixI18Next } from "remix-i18next";
import Backend from "i18next-fs-backend";
import { resolve } from "node:path";
import i18nextOptions from "../../i18next-options";

export const remixI18next = new RemixI18Next({
  detection: {
    fallbackLanguage: i18nextOptions.fallbackLng,
    supportedLanguages: i18nextOptions.supportedLngs,
  },
  i18next: {
    backend: {
      loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
    },
    i18nFormat: i18nextOptions.i18nFormat,
  },
  backend: Backend,
});
