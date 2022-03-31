import { useTranslation } from "react-i18next";
import { Link } from "remix";
import MaxWidthContainer from "./layout/MaxWidthContainer";

export default function LanguageBar() {
  const { t, i18n } = useTranslation();

  return (
    <div className="w-full bg-slate-100">
      <MaxWidthContainer classes="py-2">
        <div className="flex w-full items-center justify-start space-x-1">
          <Link
            to="/stories/add"
            className="mr-auto text-gray-600 hover:text-gray-800"
          >
            {t("contributeStory")}
          </Link>
          <a
            href="?lng=en"
            className={`${
              i18n.language === "en" ? "font-bold" : "font-normal"
            }`}
          >
            English
          </a>
          <span>|</span>
          <a
            href="?lng=ua"
            className={`${
              i18n.language === "ua" ? "font-bold" : "font-normal"
            }`}
          >
            український
          </a>
        </div>
      </MaxWidthContainer>
    </div>
  );
}
