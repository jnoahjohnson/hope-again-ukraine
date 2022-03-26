import { LoaderFunction, ActionFunction, Link } from "remix";
import { redirect } from "remix";
import { json, useLoaderData, useCatch, Form } from "remix";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import invariant from "tiny-invariant";
import MaxWidthContainer from "~/components/layout/MaxWidthContainer";
import type { Story } from "~/models/story.server";
import { deleteStory } from "~/models/story.server";
import { getStory } from "~/models/story.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  story: Story;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.storyId, "storyId not found");

  const story = await getStory({ id: params.storyId });
  if (!story) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ story });
};

export default function UserStoryDetailPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <div className="w-full bg-slate-100">
        <MaxWidthContainer py="2">
          <Link
            to="/stories"
            className="flex items-center font-semibold text-gray-800 hover:text-gray-900 hover:underline"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to all stories
          </Link>
        </MaxWidthContainer>
      </div>
      <div className="mx-auto max-w-prose py-8">
        <img
          src={data.story.imageUrl ?? ""}
          alt={data.story.title}
          className="mb-6 rounded shadow-lg"
        />
        <h3 className="text-4xl font-bold">{data.story.title}</h3>
        <p className="py-4 text-lg">{data.story.body}</p>
      </div>
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
