import type { LoaderFunction, ActionFunction } from "remix";
import { redirect } from "remix";
import { json, useLoaderData, useCatch, Form } from "remix";
import invariant from "tiny-invariant";
import type { Story } from "~/models/story.server";
import { deleteStory } from "~/models/story.server";
import { getStory } from "~/models/story.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  story: Story;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.storyId, "storyId not found");

  const story = await getStory({ userId, id: params.storyId });
  if (!story) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ story });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.storyId, "storyId not found");

  await deleteStory({ userId, id: params.storyId });

  return redirect("/stories");
};

export default function UserStoryDetailPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.story.title}</h3>
      <p className="py-6">{data.story.body}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Story not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
