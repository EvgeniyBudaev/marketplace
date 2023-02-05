import { RemixBrowser } from "@remix-run/react";
import { getInitialNamespaces } from "remix-i18next";
import { startTransition, StrictMode } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { hydrateRoot } from "react-dom/client";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ICU from "i18next-icu";
import Backend from "i18next-http-backend";
import i18nextOptions from "../i18next-options";

async function hydrate() {
  await i18next
    .use(ICU)
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
      ...i18nextOptions,
      ns: getInitialNamespaces(),
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
        requestOptions: {
          cache: "no-store",
        },
      },
      detection: {
        order: ["htmlTag"],
        caches: [],
      },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <I18nextProvider i18n={i18next}>
          <RemixBrowser />
        </I18nextProvider>
      </StrictMode>,
    );
  });
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
