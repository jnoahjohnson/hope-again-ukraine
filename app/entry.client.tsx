import i18n from "i18next";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { RemixBrowser } from "remix";
import { initI18Next } from "./utils/i18n";

// we initialize i18next
initI18Next(i18n)
  .then(() => {
    // and after it started and fetched the messages we will hydrate our app wrapped with
    // the I18nextProvider component too
    return ReactDOM.hydrate(
      <I18nextProvider i18n={i18n}>
        <RemixBrowser />
      </I18nextProvider>,
      document
    );
  })
  .catch((error) => console.error(error));
