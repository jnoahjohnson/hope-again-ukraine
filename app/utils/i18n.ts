import { pick } from "accept-language-parser";

// we will import i18n and the types of their option
import i18n, { InitOptions } from "i18next";
// for client-side language detection we will use this plugin, it will follow a similar flow as we did for the server
import LanguageDetector from "i18next-browser-languagedetector";
// to load the localized messages client-side we will use this plugin to fetch them
import HttpApi from "i18next-http-backend";
// and to use it with React with need this plugin
import { initReactI18next } from "react-i18next";
import en from "../data/locales/en.json";
import ua from "../data/locales/ua.json";

let isBrowser = typeof window === "object" && typeof document === "object";

export async function initI18Next(i18next: typeof i18n, language?: string) {
  // first we add the generic configuration for client and server
  let options: InitOptions = {
    fallbackLng: "en",
    supportedLngs: supportedLanguages,
    keySeparator: false,
    load: "languageOnly",
    initImmediate: true,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    detection: {
      caches: ["cookie"],
    },
  };

  // then we add configuration used only server-side
  if (!isBrowser) {
    // here we set the language we are going to use
    options.lng = language ?? defaultLanguage;
    // and the namespace
    options.defaultNS = "namespace1";
  }

  // then we add the configuration used only client-side
  if (isBrowser) {
    // here we configure the path for our JSON filas with the localized messages
    options.backend = { loadPath: "/locales/{{lng}}.json" };
    // and here we set what to use as cache for the language detection
    options.detection = { caches: ["cookie"] };
    // and we tell i18next to use the language detector and http api plugins
    i18next.use(LanguageDetector).use(HttpApi);
  }

  // now we tell i18next to use the React plunig and wee initialize it with our options
  await i18next.use(initReactI18next).init(options);

  if (!isBrowser) {
    // finally if we are running server-side we will require the localized message from the public/locales folder
    // and add it as a resource bundle to i18next so it has the localized message already loaded
    i18n.addResourceBundle(
      language ?? defaultLanguage,
      "namespace1",
      language === "en" ? en : ua
    );
  }
}

let supportedLanguages = ["en", "ua"];
let defaultLanguage = "en";

function getFromSupported(language: string | null) {
  return (
    pick(supportedLanguages, language ?? defaultLanguage, { loose: true }) ??
    defaultLanguage
  );
}

export function detectLanguage(request: Request) {
  // first we prioritize the URL, if the user adds the `lng` is most likely what they want
  console.log("start");
  let url = new URL(request.url);
  if (url.searchParams.has("lng")) {
    return getFromSupported(url.searchParams.get("lng"));
  }
  console.log("1");

  // then we use the cookie, using this cookie we can store the user preference with a form
  let cookie = Object.fromEntries(
    request.headers
      .get("Cookie")
      ?.split(";")
      .map((cookie) => cookie.split("=")) ?? []
  ) as { i18next?: string };

  if (cookie.i18next) {
    return getFromSupported(cookie.i18next);
  }
  console.log("2");

  // and then we check the Accept-Language header and use that, this will have the value
  // of the language the user use for their OS
  if (request.headers.has("accept-language")) {
    return getFromSupported(request.headers.get("accept-language"));
  }

  console.log("3");

  // finally, we fallback to our default language
  return defaultLanguage;
}
