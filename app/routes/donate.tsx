import { useTranslation } from "react-i18next";
import { Outlet } from "remix";
import Hero from "~/components/Hero";

export default function DonationsPage() {
  const [t] = useTranslation();
  return (
    <div>
      <Hero
        title={t("provideSupport")}
        imgSrc="https://images.unsplash.com/photo-1524604083486-642ad47e3ca7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
        altText="Person walking next to train"
      />
      <Outlet />
    </div>
  );
}
