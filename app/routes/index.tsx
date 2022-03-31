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
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation();

  return (
    <main className="relative">
      <HomeHero
        altText="Ukraine People"
        imgSrc="https://res.cloudinary.com/pineapple-solutions/image/upload/v1648336053/HopeAgainUkraine/hero_i9wjt8.jpg"
        title="Choose To Give Hope"
      />
      <MaxWidthContainer>
        <h1 className="mb-2 text-4xl font-semibold text-gray-800">
          {t("challenge")}
        </h1>
        <FactsSection />
      </MaxWidthContainer>
      <MaxWidthContainer>
        <h1 className="mb-2 text-4xl font-semibold text-gray-800">
          {t("howHelp")}
        </h1>
        <p className="mb-4 max-w-prose text-xl font-medium text-gray-700">
          {t("howHelpSub")}
        </p>
        <DonationGrid donations={data.donations} cascade columns={4} />
        <div className="mt-8 text-center">
          <Link
            to="/donate"
            className="text-center text-xl font-semibold text-gray-700 hover:text-gray-800 hover:underline"
          >
            {t("seeAllItems")}
          </Link>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <h1 className="mb-2 text-4xl font-semibold text-gray-800">
          {t("impactHeader")}
        </h1>
        <p className="mb-4 max-w-prose text-xl font-medium text-gray-700">
          {t("impactSub")}
        </p>
        <StoryGrid stories={data.stories} cascade />
        <div className="mt-8 text-center">
          <Link
            to="/stories"
            className="text-center text-xl font-semibold text-gray-700 hover:text-gray-800 hover:underline"
          >
            {t("moreStories")}
          </Link>
        </div>
      </MaxWidthContainer>
    </main>
  );
}
