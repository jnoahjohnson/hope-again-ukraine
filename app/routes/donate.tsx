import { Outlet } from "remix";
import Hero from "~/components/Hero";

export default function DonationsPage() {
  return (
    <div>
      <Hero title="Provide Support" />
      <Outlet />
    </div>
  );
}
