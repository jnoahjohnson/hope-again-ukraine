import { Donation, Story } from "@prisma/client";
import { prisma } from "~/db.server";
import { json, Link, LoaderFunction, useLoaderData } from "remix";
import Hero from "~/components/Hero";
import { useOptionalUser } from "~/utils";
import StoryGrid from "~/components/StoryGrid";
import DonationGrid from "~/components/DonationGrid";
import MaxWidthContainer from "~/components/layout/MaxWidthContainer";

type LoaderData = {
  stories: Story[];
  donations: Donation[];
};

export const loader: LoaderFunction = async () => {
  const stories = await prisma.story.findMany({
    where: {
      approved: true,
    },
    take: 3,
  });

  const donations = await prisma.donation.findMany({ take: 4 });

  return json<LoaderData>({ stories, donations });
};

export default function Index() {
  const user = useOptionalUser();
  const data = useLoaderData() as LoaderData;

  return (
    <main className="relative">
      <Hero />
      <MaxWidthContainer>
        <h1 className="mb-2 text-4xl font-semibold text-gray-800">
          Featured Stories
        </h1>
        <StoryGrid stories={data.stories} />
      </MaxWidthContainer>
      <MaxWidthContainer>
        <h1 className="mb-2 text-4xl font-semibold text-gray-800">
          Provide Aid
        </h1>
        <DonationGrid donations={data.donations} />

        <Link
          to="/donate"
          className="mx-auto mt-4 block w-48 rounded bg-gray-800 py-3 text-center font-bold text-white hover:bg-gray-700"
        >
          See All Donations
        </Link>
      </MaxWidthContainer>
    </main>
  );
}
