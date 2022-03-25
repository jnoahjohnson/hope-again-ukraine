import { json, LoaderFunction, NavLink, useLoaderData } from "remix";
import { getAllStories } from "~/models/story.server";

type LoaderData = {
  storyListItems: Awaited<ReturnType<typeof getAllStories>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const storyListItems = await getAllStories();
  return json<LoaderData>({ storyListItems });
};

export default function UserStoryIndexPage() {
  const data = useLoaderData() as LoaderData;
  return (
    <div>
      {data.storyListItems.length === 0 ? (
        <p className="p-4">No notes yet</p>
      ) : (
        <ol>
          {data.storyListItems.map((story) => (
            <li key={story.id}>
              <NavLink
                className={({ isActive }) =>
                  `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                }
                to={story.id}
              >
                {story.title}
              </NavLink>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
