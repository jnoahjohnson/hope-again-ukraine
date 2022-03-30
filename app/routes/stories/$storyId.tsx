import { LoaderFunction, Link } from "remix";
import { json, useLoaderData, useCatch } from "remix";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import invariant from "tiny-invariant";
import type { Story } from "~/models/story.server";
import { getStory } from "~/models/story.server";
import { Donation } from "@prisma/client";
import { prisma } from "~/db.server";
import DonationGrid from "~/components/DonationGrid";

type LoaderData = {
  story: Story;
  donationItems: Donation[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.storyId, "storyId not found");

  const story = await getStory({ id: params.storyId });
  if (!story) {
    throw new Response("Not Found", { status: 404 });
  }

  const donationItems = await prisma.donation.findMany({
    take: 3,
  });

  return json<LoaderData>({ story, donationItems });
};

export default function UserStoryDetailPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <div className="mx-auto max-w-prose py-5 px-4">
        <Link
          to="/stories"
          className="mb-2 flex items-center text-lg font-semibold text-gray-800 hover:text-gray-900 hover:underline"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to all stories
        </Link>
        <img
          src={data.story.imageUrl ?? ""}
          alt={data.story.firstName ?? ""}
          className="mb-6 rounded shadow-lg"
        />
        <div className="mb-4">
          <h1 className="text-3xl font-bold">
            {data.story.firstName + " " + data.story.lastName}
          </h1>
          <p className="text-xl text-gray-700">
            Hometown: {data.story.hometown}
          </p>
          <p className="text-xl text-gray-700">
            Profession/Hobbies: {data.story.profession}
          </p>
        </div>
        <article className="mb-4">
          <h2 className="mb-1 text-2xl font-semibold text-gray-600">
            What do you love about Ukraine?
          </h2>
          <p className="mb-4 whitespace-pre-wrap text-lg leading-relaxed">
            {data.story.questionOne}
          </p>
          <h2 className="mb-1 text-2xl font-semibold text-gray-600">
            How have you been impacted by the Russian Invasion?
          </h2>
          <p className="whitespace-pre-wrap text-lg leading-relaxed">
            {data.story.questionOne}
          </p>
        </article>
        <div className="py-4">
          <h2 className="mb-2 text-2xl font-medium text-gray-700">
            Ways to Help
          </h2>
          <DonationGrid donations={data.donationItems} columns={3} />
          <div className="mt-8 text-center">
            <Link
              to="/donations"
              className="text-center text-xl font-semibold text-gray-700 hover:text-gray-800 hover:underline"
            >
              See More Ways
            </Link>
          </div>
        </div>
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
