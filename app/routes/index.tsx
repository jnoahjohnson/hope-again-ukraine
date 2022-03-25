import { Story } from "@prisma/client";
import { prisma } from "~/db.server";
import { json, LoaderFunction, useLoaderData } from "remix";
import Hero from "~/components/Hero";
import { useOptionalUser } from "~/utils";
import HomeStories from "~/components/HomeStories";

type LoaderData = {
  stories: Story[];
};

export const loader: LoaderFunction = async () => {
  const stories = await prisma.story.findMany({
    where: {
      approved: true,
    },
    take: 3,
  });

  return json<LoaderData>({ stories });
};

export default function Index() {
  const user = useOptionalUser();
  const data = useLoaderData() as LoaderData;

  return (
    <main className="relative">
      <Hero />
      <div className="mx-auto max-w-6xl py-8">
        <h1 className="mb-2 text-4xl font-semibold text-gray-800">
          Discover Stories
        </h1>
        <HomeStories stories={data.stories} />
      </div>
    </main>
  );
}
