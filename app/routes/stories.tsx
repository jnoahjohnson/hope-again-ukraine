import { Outlet } from "remix";

export default function StoriesPage() {
  return (
    <main className="flex h-full bg-white">
      <Outlet />
    </main>
  );
}
