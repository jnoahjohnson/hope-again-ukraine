import i18n from "i18next";
import ReactDOMServer from "react-dom/server";
import { I18nextProvider } from "react-i18next";
import type { EntryContext } from "remix";
import { RemixServer } from "remix";
import { detectLanguage, initI18Next } from "./utils/i18n";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // we detect the language and initialize i18next with that language
  await initI18Next(i18n, detectLanguage(request));

  // we render the RemixServer component wrapping it in the I18nextProvider
  // this way our app will have access to the i18n instance with the messages loaded
  let markup = ReactDOMServer.renderToString(
    <I18nextProvider i18n={i18n}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
  );
  // finally send the response
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: {
      ...Object.fromEntries(responseHeaders),
      "Content-Type": "text/html",
    },
  });
}
