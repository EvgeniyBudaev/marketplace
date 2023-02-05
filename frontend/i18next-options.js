export default {
  debug: false, // process.env.NODE_ENV !== 'production'
  fallbackLng: "ru",
  supportedLngs: ["en", "ru"],
  defaultNS: "index",
  react: { useSuspense: false },
  i18nFormat: {
    memoize: true,
    memoizeFallback: false,
    bindI18n: "",
    bindI18nStore: "",
    parseErrorHandler: () => {},
  },
};
