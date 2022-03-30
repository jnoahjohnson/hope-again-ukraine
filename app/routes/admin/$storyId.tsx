import type { LoaderFunction, ActionFunction } from "remix";
import { redirect } from "remix";
import { json, useLoaderData, useCatch, Form } from "remix";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { Story } from "~/models/story.server";
import { deleteStory } from "~/models/story.server";

import { requireAdmin, requireUserId } from "~/session.server";

type LoaderData = {
  story: Story;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireAdmin(request);
  invariant(params.storyId, "storyId not found");

  const story = await prisma.story.findUnique({
    where: { id: params.storyId },
  });
  if (!story) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ story });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.storyId, "storyId not found");
  const formData = await request.formData();
  const approved = formData.get("approved");

  if (typeof approved !== "string") {
    throw Error("Invalid form data");
  }

  await prisma.story.update({
    where: { id: params.storyId },
    data: { approved: approved === "true" },
  });

  return redirect("/admin");
};

export default function AdminStoryDetailPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-3xl font-bold">
        {data.story.firstName} {data.story.lastName}
      </h3>
      <img
        src={data.story.imageUrl ?? ""}
        alt={data.story.firstName ?? "Story"}
        className="mx-auto w-full max-w-xl rounded py-2"
      />
      <p className="">Hometown: {data.story.hometown}</p>
      <p className="mb-2">Profession: {data.story.profession}</p>
      <p className="py-1">{data.story.questionOne}</p>
      <p className="py-1">{data.story.questionTwo}</p>
      <hr className="my-4" />
      <Form method="post">
        <input
          type="hidden"
          name="approved"
          value={data.story.approved ? "false" : "true"}
        />
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          {data.story.approved ? "Unapprove" : "Approve"}
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
