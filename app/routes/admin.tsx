import { Form, json, useLoaderData, Outlet, Link, NavLink } from "remix";
import type { LoaderFunction } from "remix";
import { Story } from "@prisma/client";
import { requireAdmin, requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getStoryListItems } from "~/models/story.server";
import MaxWidthContainer from "~/components/layout/MaxWidthContainer";
import { prisma } from "~/db.server";

type LoaderData = {
  allStories: Story[];
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdmin(request);
  const allStories = await prisma.story.findMany();
  return json<LoaderData>({ allStories });
};

export default function AdminPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="">
      <header className="bg-slate-800 p-4 text-white">
        <MaxWidthContainer classes="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            <Link to=".">Stories</Link>
          </h1>
          <p>Admin</p>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        </MaxWidthContainer>
      </header>

      <main className="flex bg-white">
        <div className=" w-80 border-r bg-gray-50">
          {data.allStories.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
            <ol className="sticky top-0">
              {data.allStories.map((story) => (
                <li key={story.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={story.id}
                  >
                    <div className="flex flex-col items-start">
                      <p>
                        {story.firstName} {story.lastName}
                      </p>
                      {story.approved && (
                        <p className="mt-1 rounded bg-green-300 px-2 py-1 text-sm text-green-800">
                          Approved
                        </p>
                      )}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
