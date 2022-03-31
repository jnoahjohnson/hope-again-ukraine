import { json, LoaderFunction, useLoaderData } from "remix";
import StoryGrid from "~/components/StoryGrid";
import { getAllStories } from "~/models/story.server";
import type { Story } from "@prisma/client";
import MaxWidthContainer from "~/components/layout/MaxWidthContainer";
import Hero from "~/components/Hero";
import { useTranslation } from "react-i18next";

type LoaderData = {
  allStories: Story[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const allStories = await getAllStories();
  return json<LoaderData>({ allStories });
};

export default function UserStoryIndexPage() {
  const data = useLoaderData() as LoaderData;
  const [t] = useTranslation();
  return (
    <>
      <Hero
        imgSrc="https://images.unsplash.com/photo-1565711561500-49678a10a63f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        altText="Ukraine Flag"
        title={t("discoverStories")}
      />
      <MaxWidthContainer>
        <StoryGrid stories={data.allStories} />
      </MaxWidthContainer>
    </>
  );
}
