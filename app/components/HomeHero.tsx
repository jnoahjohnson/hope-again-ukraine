import { useTranslation } from "react-i18next";
import { Link } from "remix";

export default function HomeHero({
  imgSrc = "https://images.unsplash.com/photo-1565711561500-49678a10a63f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  altText = "Ukraine Flag",
  title = "Discover Stories",
}: {
  imgSrc?: string;
  altText?: string;
  title?: string;
}) {
  let [t] = useTranslation();
  return (
    <div className="relative h-[400px] w-full bg-gray-200">
      <img
        src={imgSrc}
        className="absolute inset-0 h-full w-full object-cover bg-blend-multiply"
        alt={altText}
      />
      <div className="absolute inset-0 h-full w-full bg-black opacity-60" />
      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-4">
        <h1 className="mb-2 text-center text-5xl font-extrabold text-white">
          {t("title")}{" "}
          <span className="animate-to-yellow capitalize opacity-0 animation-delay-200">
            {t("give")}
          </span>{" "}
          <span className="animate-to-blue  capitalize opacity-0 animation-delay-500">
            {t("hope")}
          </span>
        </h1>
        <h2 className="max-w-prose text-center text-xl font-semibold text-gray-100">
          {t("homeHero")}
        </h2>
        <div className="mt-4 flex gap-4">
          <Link
            to="/stories"
            className="text-wite rounded bg-primary-yellow-dark px-4 py-2 font-semibold text-white shadow"
          >
            {t("readStories")}
          </Link>
          <Link
            to="/donate"
            className="text-wite rounded bg-primary-blue-light px-4 py-2 font-semibold text-white shadow"
          >
            {t("donateNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}
