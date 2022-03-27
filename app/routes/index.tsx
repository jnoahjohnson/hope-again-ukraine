import { Donation, Story } from "@prisma/client";
import { prisma } from "~/db.server";
import { json, Link, LoaderFunction, useLoaderData } from "remix";
import Hero from "~/components/Hero";
// import { useOptionalUser } from "~/utils";
import StoryGrid from "~/components/StoryGrid";
import DonationGrid from "~/components/DonationGrid";
import MaxWidthContainer from "~/components/layout/MaxWidthContainer";
import FactsSection from "~/components/home/FactsSection";
import HomeHero from "~/components/HomeHero";

type LoaderData = {
  stories: Story[];
  donations: Donation[];
};

export const loader: LoaderFunction = async ({ request }) => {
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
  // const user = useOptionalUser();
  const data = useLoaderData() as LoaderData;

  return (
    <main className="relative">
      <HomeHero
        altText="Ukraine People"
        imgSrc="https://res.cloudinary.com/pineapple-solutions/image/upload/v1648336053/HopeAgainUkraine/hero_i9wjt8.jpg"
        title="Choose To Give Hope"
      />
      <MaxWidthContainer>
        <h1 className="mb-2 text-4xl font-semibold text-gray-800">
          The Challenge
        </h1>
        <FactsSection />
      </MaxWidthContainer>
      <MaxWidthContainer>
        <h1 className="mb-2 text-4xl font-semibold text-gray-800">
          How You Can Help
        </h1>
        <p className="mb-4 max-w-prose text-xl font-medium text-gray-700">
          Donate to those in need. The donations that you give will be used to
          purchase the following items or equivalent items of the same value.
        </p>
        <DonationGrid donations={data.donations} />
        <div className="mt-8 text-center">
          <Link
            to="/donate"
            className="text-center text-xl font-semibold text-gray-700 hover:text-gray-800 hover:underline"
          >
            See All Items
          </Link>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <h1 className="mb-2 text-4xl font-semibold text-gray-800">
          Who You Are Impacting
        </h1>
        <p className="mb-4 max-w-prose text-xl font-medium text-gray-700">
          Learn about inspiring stories from real Ukrainian refugees who are
          struggling due to the conflict, but benefiting from your donations.
        </p>
        <StoryGrid stories={data.stories} />
        <div className="mt-8 text-center">
          <Link
            to="/stories"
            className="text-center text-xl font-semibold text-gray-700 hover:text-gray-800 hover:underline"
          >
            See More Stories
          </Link>
        </div>
      </MaxWidthContainer>
    </main>
  );
}
